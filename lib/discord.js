import crypto from "crypto";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const BASE_URL = "https://discord.com/api/v10";
const MAX_LENGTH = 1900; // Discord limit is 2000, leave room for safety

/**
 * Verifica la firma Ed25519 de Discord.
 * Discord envía la public key como hex de 32 bytes raw — hay que wrappearla
 * en un header SPKI para que Node.js crypto pueda usarla.
 */
export async function verifyDiscordRequest(req) {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");

  if (!signature || !timestamp || !DISCORD_PUBLIC_KEY) {
    return { valid: false, body: null };
  }

  const rawBody = await req.text();

  try {
    const rawKey = Buffer.from(DISCORD_PUBLIC_KEY, "hex");
    // Prefijo DER/SPKI para Ed25519 (OID 1.3.101.112)
    const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
    const keyObject = crypto.createPublicKey({
      key: Buffer.concat([spkiPrefix, rawKey]),
      format: "der",
      type: "spki",
    });

    const isValid = crypto.verify(
      null,
      Buffer.from(timestamp + rawBody),
      keyObject,
      Buffer.from(signature, "hex")
    );

    return { valid: isValid, body: rawBody };
  } catch {
    return { valid: false, body: null };
  }
}

/**
 * Edita la respuesta diferida de un slash command.
 * Usar después de haber respondido con type: 5 (DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE).
 */
export async function editDeferredReply(token, content) {
  const text = content.length > MAX_LENGTH
    ? content.slice(0, MAX_LENGTH) + "\n\n*(respuesta truncada por límite de Discord)*"
    : content;

  await fetch(`${BASE_URL}/webhooks/${DISCORD_APPLICATION_ID}/${token}/messages/@original`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: text }),
  });
}

/**
 * Envía un mensaje a un canal de Discord.
 * Usado por el cron para notificar errores no resueltos.
 */
export async function sendToChannel(channelId, content) {
  const text = content.length > MAX_LENGTH
    ? content.slice(0, MAX_LENGTH) + "\n\n*(mensaje truncado)*"
    : content;

  await fetch(`${BASE_URL}/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    },
    body: JSON.stringify({ content: text }),
  });
}

/**
 * Convierte markdown de Slack a markdown de Discord.
 * Slack: *bold*, _italic_, <url|text>
 * Discord: **bold**, *italic*, [text](url)
 */
export function slackToDiscord(text) {
  return text
    .replace(/<([^|>\s]+)\|([^>]+)>/g, "[$2]($1)")  // <url|texto> → [texto](url)
    .replace(/\*([^*\n]+)\*/g, "**$1**")             // *bold* → **bold**
    .replace(/_([^_\n]+)_/g, "*$1*");                // _italic_ → *italic*
}
