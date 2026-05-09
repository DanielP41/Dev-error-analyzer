import { NextResponse } from "next/server";
import { verifyDiscordRequest, editDeferredReply, slackToDiscord } from "@/lib/discord";
import { findInMemory, saveError } from "@/lib/memory";
import { analyzeError, formatMemoryHit } from "@/lib/agent";
import { searchRepoForError } from "@/lib/github";

export async function POST(req) {
  const { valid, body } = await verifyDiscordRequest(req);

  if (!valid) {
    return NextResponse.json({ error: "Invalid request signature" }, { status: 401 });
  }

  const interaction = JSON.parse(body);

  // Discord PING — requerido para verificar el endpoint en el portal
  if (interaction.type === 1) {
    return NextResponse.json({ type: 1 });
  }

  // APPLICATION_COMMAND — slash command /analyze
  if (interaction.type === 2) {
    const errorText = interaction.data?.options?.[0]?.value?.trim();
    const channelId = interaction.channel_id;
    const token = interaction.token;

    if (!errorText) {
      return NextResponse.json({
        type: 4,
        data: {
          content: "Tenés que pasar el error como argumento.\nEjemplo: `/analyze TypeError: Cannot read properties of undefined`",
        },
      });
    }

    // Procesa el error de forma asíncrona para no superar el timeout de 3s de Discord
    processDiscordError({ errorText, channelId, token }).catch((err) => {
      console.error("processDiscordError failed:", err?.message, err?.stack);
    });

    // type 5 = DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE (muestra "Bot está pensando...")
    return NextResponse.json({ type: 5 });
  }

  return NextResponse.json({ type: 1 });
}

async function processDiscordError({ errorText, channelId, token }) {
  // 1. Buscar en memoria si este error ya fue visto
  const memoryHit = await findInMemory(errorText);

  if (memoryHit) {
    const message = slackToDiscord(formatMemoryHit(memoryHit));
    await editDeferredReply(token, message);
    await saveError({
      errorText,
      channel: channelId,
      ts: Date.now().toString(),
      analysis: memoryHit.analysis,
      source: "discord",
      discordChannelId: channelId,
    });
    return;
  }

  // 2. Error nuevo: analizar con Groq
  const analysis = await analyzeError(errorText);

  // 3. Buscar archivos relacionados en el repo de GitHub
  const repoMatches = await searchRepoForError(errorText);

  // 4. Construir respuesta en markdown de Discord
  let response = slackToDiscord(analysis);

  if (repoMatches?.length) {
    response += "\n\n**📂 Archivos relacionados en el repo:**\n";
    response += repoMatches.map((f) => `• [${f.path}](${f.url})`).join("\n");
  }

  response +=
    "\n\n*Si resolviste el error, usá `/resolved` para marcarlo. Si nadie lo resuelve, se abrirá un issue en GitHub automáticamente.*";

  // 5. Editar la respuesta diferida con el análisis
  await editDeferredReply(token, response);

  // 6. Guardar en memoria
  await saveError({
    errorText,
    channel: channelId,
    ts: Date.now().toString(),
    analysis,
    source: "discord",
    discordChannelId: channelId,
  });
}
