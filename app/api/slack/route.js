import { NextResponse } from "next/server";
import { replyInThread, looksLikeAnError } from "@/lib/slack";
import { findInMemory, saveError } from "@/lib/memory";
import { analyzeError, formatMemoryHit } from "@/lib/agent";
import { searchRepoForError } from "@/lib/github";

export async function POST(req) {
  const body = await req.json();

  // 1. Responder al challenge de verificación de Slack (setup inicial)
  if (body.type === "url_verification") {
    return NextResponse.json({ challenge: body.challenge });
  }

  // 2. Procesar eventos de mensajes
  if (body.event?.type === "message") {
    const { text, channel, ts, thread_ts, bot_id } = body.event;

    // Ignorar mensajes del propio bot y mensajes en hilos (replies)
    if (bot_id || thread_ts) {
      return NextResponse.json({ ok: true });
    }

    // Verificar si el mensaje parece un error
    if (!text || !looksLikeAnError(text)) {
      return NextResponse.json({ ok: true });
    }

    // Responder inmediatamente a Slack (tiene timeout de 3s)
    // El procesamiento real lo hacemos de forma asíncrona
    processError({ text, channel, ts }).catch((err) => {
      console.error("processError failed:", err?.message, err?.stack);
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}

/**
 * Procesa el error de forma asíncrona para no bloquear la respuesta a Slack.
 */
async function processError({ text, channel, ts }) {
  // 1. Buscar en memoria si este error ya fue visto
  const memoryHit = await findInMemory(text);

  if (memoryHit) {
    const message = formatMemoryHit(memoryHit);
    await replyInThread(channel, ts, message);
    await saveError({ errorText: text, channel, ts, analysis: memoryHit.analysis });
    return;
  }

  // 2. Error nuevo: analizar con Groq
  const analysis = await analyzeError(text);

  // 3. Buscar en el repo de GitHub archivos relacionados
  const repoMatches = await searchRepoForError(text);

  // 4. Construir respuesta
  let response = analysis;

  if (repoMatches?.length) {
    response += "\n\n*📂 Archivos relacionados en el repo:*\n";
    response += repoMatches.map((f) => `• <${f.url}|${f.path}>`).join("\n");
  }

  response += "\n\n_Si resolviste el error, respondé en este hilo para marcarlo como resuelto. Si nadie responde, abriré un issue en GitHub automáticamente._";

  // 5. Responder en Slack
  await replyInThread(channel, ts, response);

  // 6. Guardar en memoria
  await saveError({ errorText: text, channel, ts, analysis });
}