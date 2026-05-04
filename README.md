\# Dev Error Analyzer — Slack Bot



Slack bot that detects errors in dev channels, analyzes them with AI, remembers past occurrences, and opens GitHub issues if nobody resolves them.



\## Features



\- Automatic detection of errors and stack traces in Slack

\- Error memory: if the error was seen before, responds instantly with the historical solution

\- AI analysis (Groq + LLaMA 3.3): probable cause + solution + code snippet

\- Repo search: shows related files from GitHub

\- Auto-issue: if nobody resolves the error within the configured time, opens a GitHub issue automatically



\## Stack



\- \*\*Next.js 14\*\* (App Router)

\- \*\*Groq API\*\* (LLaMA 3.3 70b — free tier)

\- \*\*Upstash Redis\*\* (error memory — free tier)

\- \*\*Vercel Cron Jobs\*\* (daily check)

\- \*\*GitHub API\*\* via Octokit



\## Setup



\### 1. Clone and install



```bash

git clone https://github.com/DanielP41/Dev-error-analyzer.git

cd dev-error-analyzer

npm install

```



\### 2. Create the Slack App



1\. Go to https://api.slack.com/apps → \*\*Create New App\*\* → From scratch

2\. In \*\*OAuth \& Permissions\*\* → add these Bot Token Scopes:

&#x20;  - `chat:write`

&#x20;  - `channels:history`

&#x20;  - `groups:history`

3\. In \*\*Event Subscriptions\*\* → Enable Events → Request URL: `https://your-domain.vercel.app/api/slack`

4\. Subscribe to bot events: `message.channels` and `message.groups`

5\. Install the app in your workspace and copy the \*\*Bot Token\*\*

6\. Copy the \*\*Signing Secret\*\* from Basic Information



\### 3. Create a Groq account



1\. Go to https://console.groq.com

2\. Create an API Key (free)



\### 4. Configure GitHub



1\. Go to https://github.com/settings/tokens → \*\*Generate new token (classic)\*\*

2\. Required scopes: `repo` (for code search and creating issues)



\### 5. Environment variables



Copy `.env.example` to `.env.local` and fill in:



```bash

cp .env.example .env.local

```



\### 6. Deploy on Vercel



```bash

npx vercel

```



Add the environment variables in the Vercel dashboard. Link Upstash Redis via \*\*Storage\*\* → \*\*Upstash for Redis\*\*. Add `CRON\_SECRET` as an environment variable (any long random string).



\### 7. Point the Slack webhook



Once deployed, go to the Slack App → \*\*Event Subscriptions\*\* → Request URL: `https://your-project.vercel.app/api/slack`



\## Environment Variables



| Variable | Description | Default |

|---|---|---|

| `SLACK\_BOT\_TOKEN` | Slack bot token (xoxb-...) | — |

| `SLACK\_SIGNING\_SECRET` | Slack app signing secret | — |

| `GROQ\_API\_KEY` | Groq API key | — |

| `GITHUB\_TOKEN` | GitHub personal access token | — |

| `GITHUB\_OWNER` | GitHub username or org | — |

| `GITHUB\_REPO` | Repository name | — |

| `KV\_REST\_API\_URL` | Upstash Redis URL (auto-filled by Vercel) | — |

| `KV\_REST\_API\_TOKEN` | Upstash Redis token (auto-filled by Vercel) | — |

| `TEAM\_STACK` | Team's tech stack for analysis context | `Node.js` |

| `UNRESOLVED\_TIMEOUT\_MINUTES` | Minutes before opening a GitHub issue | `30` |

| `CRON\_SECRET` | Secret to authorize cron job requests | — |



\## Project Structure



```

├── app/

│   ├── page.js                         <- landing page

│   ├── layout.js                       <- root layout

│   └── api/

│       ├── slack/route.js              <- receives Slack events

│       └── cron/check-unresolved/      <- daily cron job

├── lib/

│   ├── agent.js                        <- Groq analysis

│   ├── slack.js                        <- Slack helpers

│   ├── memory.js                       <- Upstash Redis

│   └── github.js                       <- GitHub API

├── vercel.json                         <- cron config

└── .env.example

```



\## Live Demo



https://dev-error-analyzer-b5r1.vercel.app



