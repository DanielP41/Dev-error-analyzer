import { NextResponse } from "next/server";

const BASE_URL = "https://discord.com/api/v10";

const COMMANDS = [
  {
    name: "analyze",
    description: "Analiza un error con IA y busca soluciones",
    options: [
      {
        name: "error",
        description: "El mensaje de error o stack trace a analizar",
        type: 3, // STRING
        required: true,
      },
    ],
  },
  {
    name: "resolved",
    description: "Marca el último error que reportaste como resuelto",
  },
];

/**
 * GET /api/discord/setup
 * Registra los slash commands globalmente en Discord.
 * Ejecutar una sola vez (o cuando cambien los comandos).
 * Protegido por CRON_SECRET para evitar ejecuciones no autorizadas.
 */
export async function GET(req) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appId = process.env.DISCORD_APPLICATION_ID;
  const token = process.env.DISCORD_BOT_TOKEN;

  if (!appId || !token) {
    return NextResponse.json(
      { error: "DISCORD_APPLICATION_ID y DISCORD_BOT_TOKEN son requeridos" },
      { status: 500 }
    );
  }

  const res = await fetch(`${BASE_URL}/applications/${appId}/commands`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${token}`,
    },
    body: JSON.stringify(COMMANDS),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Discord commands registration failed:", data);
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({
    ok: true,
    registered: data.map((c) => c.name),
  });
}
