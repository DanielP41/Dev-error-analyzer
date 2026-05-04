Dev Error Analyzer
A Slack bot that watches your dev channels for errors, analyzes them with AI, and responds in the thread with a diagnosis and fix. If nobody resolves it, it opens a GitHub issue automatically.
Live: https://dev-error-analyzer-b5r1.vercel.app
Track: ChatSDK Agents — Vercel Zero to Agent Hackathon 2026

What it does
When someone drops a stack trace or error message in a Slack channel, the bot:

Detects it automatically using pattern matching
Checks its memory (Upstash Redis) — if the error was seen before, it responds instantly with the historical solution
If it's new, calls Groq (LLaMA 3.3 70b) to analyze the error and generate a fix with code examples
Searches the GitHub repo for related files using the code search API
Replies in the thread with everything it found
If nobody responds to the thread within the configured timeout, it opens a GitHub issue automatically


Stack
Next.js 14 (App Router), Groq API (LLaMA 3.3 — free tier), Upstash Redis (free tier), Slack Events API, GitHub API via Octokit, deployed on Vercel Hobby.
Total infrastructure cost: $0/month.

Setup
Clone the repo and install dependencies:
bashgit clone https://github.com/DanielP41/Dev-error-analyzer.git
cd dev-error-analyzer
npm install
Create a Slack App at https://api.slack.com/apps. Add these bot scopes: chat:write, channels:history, groups:history. Enable Event Subscriptions and subscribe to message.channels and message.groups.
Create a free Groq account at https://console.groq.com and generate an API key.
Generate a GitHub personal access token with repo scope at https://github.com/settings/tokens.
Copy .env.example to .env.local and fill in your values. Deploy to Vercel and link an Upstash Redis database from the Storage tab. Point the Slack webhook to https://your-project.vercel.app/api/slack.

Environment Variables
VariableDescriptionSLACK_BOT_TOKENSlack bot token (xoxb-...)SLACK_SIGNING_SECRETSlack app signing secretGROQ_API_KEYGroq API keyGITHUB_TOKENGitHub personal access tokenGITHUB_OWNERGitHub username or orgGITHUB_REPORepository nameKV_REST_API_URLUpstash Redis URL (auto-filled by Vercel)KV_REST_API_TOKENUpstash Redis token (auto-filled by Vercel)TEAM_STACKTech stack for AI context (default: Node.js)UNRESOLVED_TIMEOUT_MINUTESMinutes before auto-opening a GitHub issue (default: 30)CRON_SECRETSecret to authorize the daily cron job

Project structure
app/
  page.js                   landing page
  layout.js                 root layout
  api/
    slack/route.js          receives Slack events
    cron/check-unresolved/  daily cron job

lib/
  agent.js                  Groq analysis logic
  slack.js                  Slack helpers and error detection
  memory.js                 Upstash Redis read/write
  github.js                 GitHub search and issue creation

vercel.json                 cron schedule config
