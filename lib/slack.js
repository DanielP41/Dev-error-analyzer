import crypto from "crypto";

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;

/**
 * Verifica que el request venga realmente de Slack
 * usando HMAC SHA-256 sobre el signing secret.
 */
export async function verifySlackSignature(req) {
  const timestamp = req.headers.get("x-slack-request-timestamp");
  const slackSignature = req.headers.get("x-slack-signature");

  // Evitar replay attacks (± 5 minutos)
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > 300) return false;

  const rawBody = await req.text();
  const baseString = `v0:${timestamp}:${rawBody}`;
  const hmac = crypto
    .createHmac("sha256", SLACK_SIGNING_SECRET)
    .update(baseString)
    .digest("hex");

  const computedSignature = `v0=${hmac}`;
  return crypto.timingSafeEqual(
    Buffer.from(computedSignature),
    Buffer.from(slackSignature)
  );
}

/**
 * Responde en el hilo del mensaje original.
 */
export async function replyInThread(channel, thread_ts, text) {
  await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
    },
    body: JSON.stringify({
      channel,
      thread_ts,
      text,
      mrkdwn: true,
    }),
  });
}

/**
 * Detecta si un mensaje parece contener un error o stack trace.
 */
export function looksLikeAnError(text) {
  const errorPatterns = [
    /error:/i,
    /exception:/i,
    /traceback/i,
    /at\s+\w+\.\w+\s*\(/,    // stack trace de Node
    /^\s+at\s/m,              // líneas de stack trace
    /uncaughtexception/i,
    /unhandledrejection/i,
    /panic:/i,                 // Go
    /fatal:/i,
    /segmentation fault/i,
    /typeerror/i,
    /syntaxerror/i,
    /referenceerror/i,
    /cannot read propert/i,
  ];
  return errorPatterns.some((pattern) => pattern.test(text));
}
