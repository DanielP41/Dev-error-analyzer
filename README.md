# Dev Error Analyzer

A Slack bot that watches your dev channels for errors, analyzes them with AI, and responds in the thread with a diagnosis and fix. If nobody resolves it, it opens a GitHub issue automatically.

**Live:** https://dev-error-analyzer-b5r1.vercel.app

**Track:** ChatSDK Agents — Vercel Zero to Agent Hackathon 2026

## What it does

When someone drops a stack trace or error message in a Slack channel, the bot:

1. Detects it automatically using pattern matching
2. Checks its memory (Upstash Redis) — if the error was seen before, it responds instantly with the historical solution
3. If it's new, calls Groq (LLaMA 3.3 70b) to analyze the error and generate a fix with code examples
4. Searches the GitHub repo for related files using the code search API
5. Replies in the thread with everything it found
6. If nobody responds within the configured timeout, it opens a GitHub issue automatically

## Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| AI | Groq API — LLaMA 3.3 70b (free tier) |
| Memory | Upstash Redis (free tier) |
| Chat | Slack Events API |
| Repo integration | GitHub API via Octokit |
| Deploy | Vercel Hobby |

Total infrastructure cost: **$0/month**

## Setup

**1. Clone and install**

```bash
git clone https://github.com/DanielP41/Dev-error-analyzer.git
cd dev-error-analyzer
npm install
```

**2. Create a Slack App** at https://api.slack.com/apps

Add bot scopes: `chat:write`, `channels:history`, `groups:history`

Enable Event Subscriptions, subscribe to `message.channels` and `message.groups`

**3. Create a Groq account** at https://console.groq.com and generate an API key

**4. Generate a GitHub token** at https://github.com/settings/tokens with `repo` scope

**5. Set environment variables** — copy `.env.example` to `.env.local` and fill in your values

**6. Deploy on Vercel** — link an Upstash Redis database from the Storage tab

**7. Point the Slack webhook** to `https://your-project.vercel.app/api/slack`

## Environment Variables

| Variable | Description |
|---|---|
| `SLACK_BOT_TOKEN` | Slack bot token (xoxb-...) |
| `SLACK_SIGNING_SECRET` | Slack app signing secret |
| `GROQ_API_KEY` | Groq API key |
| `GITHUB_TOKEN` | GitHub personal access token |
| `GITHUB_OWNER` | GitHub username or org |
| `GITHUB_REPO` | Repository name |
| `KV_REST_API_URL` | Upstash Redis URL (auto-filled by Vercel) |
| `KV_REST_API_TOKEN` | Upstash Redis token (auto-filled by Vercel) |
| `TEAM_STACK` | Tech stack for AI context (default: Node.js) |
| `UNRESOLVED_TIMEOUT_MINUTES` | Minutes before auto-opening a GitHub issue (default: 30) |
| `CRON_SECRET` | Secret to authorize the daily cron job |