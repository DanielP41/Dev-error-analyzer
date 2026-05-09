import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;

/**
 * Busca en el código del repo menciones relacionadas al error.
 * Usa la GitHub Code Search API.
 */
export async function searchRepoForError(errorText) {
  // Extraemos palabras clave del error (ignoramos palabras comunes)
  const stopWords = new Set(["at", "in", "the", "of", "is", "to", "and", "a", "an"]);
  const keywords = errorText
    .split(/\s+/)
    .map((w) => w.replace(/[^a-zA-Z0-9_]/g, ""))
    .filter((w) => w.length > 4 && !stopWords.has(w.toLowerCase()))
    .slice(0, 3)
    .join(" ");

  if (!keywords) return null;

  try {
    const { data } = await octokit.rest.search.code({
      q: `${keywords} repo:${owner}/${repo}`,
      per_page: 3,
    });

    if (!data.items?.length) return null;

    return data.items.map((item) => ({
      name: item.name,
      path: item.path,
      url: item.html_url,
    }));
  } catch (err) {
    console.error("GitHub search error:", err.message);
    return null;
  }
}

/**
 * Abre un issue en GitHub con el detalle del error no resuelto.
 * Soporta errores detectados en Slack o Discord.
 */
export async function openGithubIssue({ errorText, analysis, channel, slackTs, source = "slack", discordChannelId = null }) {
  const platform = source === "discord" ? "Discord" : "Slack";
  const title = `[Bot] Error sin resolver detectado en ${platform}`;

  let messageRef;
  if (source === "discord") {
    messageRef = discordChannelId
      ? `Canal de Discord: \`${discordChannelId}\``
      : "Canal de Discord";
  } else {
    const slackLink = `https://slack.com/archives/${channel}/p${slackTs.replace(".", "")}`;
    messageRef = `[Ver mensaje en Slack](${slackLink})`;
  }

  const body = `
## Error detectado automáticamente

**Plataforma:** ${platform}
**Origen:** ${messageRef}

### Stack trace / Error
\`\`\`
${errorText.slice(0, 1000)}
\`\`\`

### Análisis del agente
${analysis}

---
*Este issue fue creado automáticamente porque el error no fue resuelto en el tiempo establecido.*
`.trim();

  const { data } = await octokit.rest.issues.create({
    owner,
    repo,
    title,
    body,
    labels: ["bot", "unresolved-error"],
  });

  return data.html_url;
}
