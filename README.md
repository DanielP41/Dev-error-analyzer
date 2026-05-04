\# Dev Error Analyzer



A Slack bot that watches your dev channels for errors, analyzes them with AI, and responds in the thread with a diagnosis and fix. If nobody resolves it, it opens a GitHub issue automatically.



\*\*Live:\*\* https://dev-error-analyzer-b5r1.vercel.app  

\*\*Track:\*\* ChatSDK Agents — Vercel Zero to Agent Hackathon 2026



\---



\## What it does



When someone drops a stack trace or error message in a Slack channel, the bot:



1\. Detects it automatically using pattern matching

2\. Checks its memory (Upstash Redis) — if the error was seen before, it responds instantly with the historical solution

3\. If it's new, calls Groq (LLaMA 3.3 70b) to analyze the error and generate a fix with code examples

4\. Searches the GitHub repo for related files using the code search API

5\. Replies in the thread with everything it found

6\. If nobody responds to the thread within the configured timeout, it opens a GitHub issue automatically



\---



\## Stack



Next.js 14 (App Router), Groq API (LLaMA 3.3 — free tier), Upstash Redis (free tier), Slack Events API, GitHub API via Octokit, deployed on Vercel Hobby.



Total infrastructure cost: $0/month.



\---



\## Setup



Clone the repo and install dependencies:



```bash

git clone https://github.com/DanielP41/Dev-error-analyzer.git

cd dev-error-analyzer

npm install

```



Create a Slack App at https://api.slack.com/apps. Add these bot scopes: `chat:write`, `channels:history`, `groups:history`. Enable Event Subscriptions and subscribe to `message.channels` and `message.groups`.



Create a free Groq account at https://console.groq.com and generate an API key.



Generate a GitHub personal access token with `repo` scope at https://github.com/settings/tokens.



Copy `.env.example` to `.env.local` and fill in your values. Deploy to Vercel and link an Upstash Redis database from the Storage tab. Point the Slack webhook to `https://your-project.vercel.app/api/slack`.



\---



\## Environment Variables



| Variable | Description |

|---|---|

| `SLACK\_BOT\_TOKEN` | Slack bot token (xoxb-...) |

| `SLACK\_SIGNING\_SECRET` | Slack app signing secret |

| `GROQ\_API\_KEY` | Groq API key |

| `GITHUB\_TOKEN` | GitHub personal access token |

| `GITHUB\_OWNER` | GitHub username or org |

| `GITHUB\_REPO` | Repository name |

| `KV\_REST\_API\_URL` | Upstash Redis URL (auto-filled by Vercel) |

| `KV\_REST\_API\_TOKEN` | Upstash Redis token (auto-filled by Vercel) |

| `TEAM\_STACK` | Tech stack for AI context (default: Node.js) |

| `UNRESOLVED\_TIMEOUT\_MINUTES` | Minutes before auto-opening a GitHub issue (default: 30) |

| `CRON\_SECRET` | Secret to authorize the daily cron job |



\---



\## Project structure



```

app/

&#x20; page.js                   landing page

&#x20; layout.js                 root layout

&#x20; api/

&#x20;   slack/route.js          receives Slack events

&#x20;   cron/check-unresolved/  daily cron job



lib/

&#x20; agent.js                  Groq analysis logic

&#x20; slack.js                  Slack helpers and error detection

&#x20; memory.js                 Upstash Redis read/write

&#x20; github.js                 GitHub search and issue creation



vercel.json                 cron schedule config

```

