import { NextResponse } from "next/server";
import { getTimedOutErrors, saveGithubIssueUrl } from "@/lib/memory";
import { openGithubIssue } from "@/lib/github";
import { replyInThread } from "@/lib/slack";
import { sendToChannel } from "@/lib/discord";

/**
 * Corre cada 5 minutos (configurado en vercel.json).
 * Busca errores sin resolver que superaron el timeout
 * y abre un issue en GitHub automáticamente.
 */
export async function GET(req) {
  // Verificar que el request viene de Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timedOut = await getTimedOutErrors();

  if (!timedOut.length) {
    return NextResponse.json({ processed: 0 });
  }

  let processed = 0;

  for (const entry of timedOut) {
    try {
      // Abrir issue en GitHub
      const issueUrl = await openGithubIssue({
        errorText: entry.errorText,
        analysis: entry.analysis,
        channel: entry.channel,
        slackTs: entry.ts,
        source: entry.source || "slack",
        discordChannelId: entry.discordChannelId || null,
      });

      // Guardar la URL del issue en memoria
      await saveGithubIssueUrl(entry.hash, issueUrl);

      // Notificar en la plataforma de origen
      if (entry.source === "discord" && entry.discordChannelId) {
        await sendToChannel(
          entry.discordChannelId,
          `**⚠️ Error sin resolver detectado.** Abrí un issue en GitHub automáticamente: ${issueUrl}`
        );
      } else {
        await replyInThread(
          entry.channel,
          entry.ts,
          `*⚠️ Este error sigue sin resolver.* Abrí un issue en GitHub automáticamente: ${issueUrl}`
        );
      }

      processed++;
    } catch (err) {
      console.error(`Error procesando ${entry.hash}:`, err.message);
    }
  }

  return NextResponse.json({ processed });
}
