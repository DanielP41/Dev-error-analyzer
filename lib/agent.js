import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const TEAM_STACK = process.env.TEAM_STACK || "Node.js";

/**
 * Analiza un error con Groq (LLaMA 3) y devuelve un análisis formateado
 * listo para responder en Slack.
 */
export async function analyzeError(errorText) {
  const prompt = `
Eres un asistente experto en debugging para equipos de desarrollo.
El stack tecnológico principal del equipo es: ${TEAM_STACK}.

Analiza el siguiente error y responde en español con este formato exacto:

*🔍 Causa probable:*
[una oración clara explicando qué está fallando]

*✅ Solución:*
[pasos concretos para resolverlo]

*💻 Ejemplo de código:*
\`\`\`
[snippet de código que resuelve el problema, si aplica]
\`\`\`

*🔗 Referencias útiles:*
[links o documentación relevante, si aplica]

Error a analizar:
\`\`\`
${errorText.slice(0, 2000)}
\`\`\`
`.trim();

  const completion = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 1024,
    temperature: 0.2,
  });

  return completion.choices[0]?.message?.content || "No se pudo analizar el error.";
}

/**
 * Formatea el mensaje de respuesta en Slack cuando el error ya existe en memoria.
 */
export function formatMemoryHit(entry) {
  const date = new Date(entry.firstSeenAt).toLocaleDateString("es-AR");
  const veces = entry.occurrences === 1 ? "1 vez" : `${entry.occurrences} veces`;

  let msg = `*⚡ Este error ya fue visto antes* (${veces}, primera vez el ${date})\n\n`;
  msg += entry.analysis;

  if (entry.githubIssueUrl) {
    msg += `\n\n*📋 Issue de GitHub:* ${entry.githubIssueUrl}`;
  }

  return msg;
}
