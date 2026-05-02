import { kv } from "@vercel/kv";
import crypto from "crypto";

const ERROR_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 días
const TIMEOUT_MINUTES = Number(process.env.UNRESOLVED_TIMEOUT_MINUTES || 30);

/**
 * Genera una clave normalizada a partir del texto del error.
 * Ignora números de línea y rutas de archivo para mayor tolerancia.
 */
function normalizeError(text) {
  const cleaned = text
    .replace(/:\d+/g, "")           // quita números de línea
    .replace(/\/[\w/._-]+/g, "")    // quita rutas de archivo
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .slice(0, 300);                  // primeros 300 chars son suficientes

  return crypto.createHash("md5").update(cleaned).digest("hex");
}

/**
 * Busca si este error ya fue visto antes.
 * Devuelve el historial o null.
 */
export async function findInMemory(errorText) {
  const key = `error:${normalizeError(errorText)}`;
  return await kv.get(key);
}

/**
 * Guarda un error nuevo en memoria con estado "unresolved".
 */
export async function saveError({ errorText, channel, ts, analysis }) {
  const hash = normalizeError(errorText);
  const key = `error:${hash}`;

  const existing = await kv.get(key);

  const entry = {
    hash,
    errorText: errorText.slice(0, 500),
    channel,
    ts,
    analysis,
    status: "unresolved",
    firstSeenAt: existing?.firstSeenAt || Date.now(),
    lastSeenAt: Date.now(),
    occurrences: (existing?.occurrences || 0) + 1,
    githubIssueUrl: existing?.githubIssueUrl || null,
  };

  await kv.set(key, entry, { ex: ERROR_TTL_SECONDS });

  // También guardamos en un set de no resueltos para el cron
  await kv.sadd("unresolved_errors", hash);

  return entry;
}

/**
 * Marca un error como resuelto (cuando alguien respondió en el hilo).
 */
export async function markResolved(errorText) {
  const hash = normalizeError(errorText);
  const key = `error:${hash}`;
  const existing = await kv.get(key);
  if (!existing) return;

  await kv.set(key, { ...existing, status: "resolved" }, { ex: ERROR_TTL_SECONDS });
  await kv.srem("unresolved_errors", hash);
}

/**
 * Devuelve todos los errores sin resolver que superaron el timeout.
 */
export async function getTimedOutErrors() {
  const hashes = await kv.smembers("unresolved_errors");
  if (!hashes?.length) return [];

  const cutoff = Date.now() - TIMEOUT_MINUTES * 60 * 1000;
  const results = [];

  for (const hash of hashes) {
    const entry = await kv.get(`error:${hash}`);
    if (entry && entry.status === "unresolved" && entry.lastSeenAt < cutoff && !entry.githubIssueUrl) {
      results.push(entry);
    }
  }

  return results;
}

/**
 * Guarda la URL del issue de GitHub creado para un error.
 */
export async function saveGithubIssueUrl(hash, url) {
  const key = `error:${hash}`;
  const existing = await kv.get(key);
  if (!existing) return;
  await kv.set(key, { ...existing, githubIssueUrl: url }, { ex: ERROR_TTL_SECONDS });
  await kv.srem("unresolved_errors", hash);
}
