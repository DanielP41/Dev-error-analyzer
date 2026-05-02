# 🤖 Dev Error Analyzer — Slack Bot

Bot de Slack que detecta errores en canales de desarrollo, los analiza con IA,
recuerda errores vistos anteriormente y abre issues en GitHub si nadie los resuelve.

## Funcionalidades

- 🔍 **Detección automática** de errores y stack traces en Slack
- 🧠 **Memoria de errores**: si el error ya fue visto, responde con el historial
- 🤖 **Análisis con IA** (Groq + LLaMA 3): causa probable + solución + código
- 📂 **Búsqueda en el repo**: muestra archivos relacionados de GitHub
- 🎫 **Auto-issue**: si nadie resuelve el error en X minutos, abre un issue en GitHub

## Stack

- **Next.js 14** (App Router)
- **Groq API** (LLaMA 3 - gratis)
- **Vercel KV** (memoria - gratis en Hobby)
- **Vercel Cron Jobs** (check cada 5 min)
- **GitHub API** via Octokit

## Setup

### 1. Clonar e instalar

```bash
git clone <tu-repo>
cd dev-error-analyzer
npm install
```

### 2. Crear la Slack App

1. Ir a https://api.slack.com/apps → **Create New App** → From scratch
2. En **OAuth & Permissions** → agregar estos Bot Token Scopes:
   - `chat:write`
   - `channels:history`
   - `groups:history`
3. En **Event Subscriptions** → Enable Events → Request URL: `https://tu-dominio.vercel.app/api/slack`
4. Suscribirse al evento: `message.channels` y `message.groups`
5. Instalar la app en tu workspace y copiar el **Bot Token**
6. Copiar el **Signing Secret** desde Basic Information

### 3. Crear cuenta en Groq

1. Ir a https://console.groq.com
2. Crear API Key (gratis)

### 4. Configurar GitHub

1. Ir a https://github.com/settings/tokens → **Generate new token (classic)**
2. Permisos necesarios: `repo` (para search y crear issues)

### 5. Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
cp .env.example .env.local
```

### 6. Deployar en Vercel

```bash
npx vercel
```

Agregar las variables de entorno en el dashboard de Vercel.
Linkear Vercel KV: **Storage** → **Create Database** → **KV**.
Agregar `CRON_SECRET` como variable de entorno (puede ser cualquier string largo).

### 7. Apuntar el webhook de Slack

Una vez deployado, ir a la Slack App → **Event Subscriptions** →
Request URL: `https://tu-proyecto.vercel.app/api/slack`

## Configuración

| Variable | Descripción | Default |
|---|---|---|
| `TEAM_STACK` | Stack del equipo para contexto del análisis | `Node.js` |
| `UNRESOLVED_TIMEOUT_MINUTES` | Minutos antes de abrir issue en GitHub | `30` |

## Estructura del proyecto

```
├── app/
│   └── api/
│       ├── slack/route.js              ← recibe eventos de Slack
│       └── cron/check-unresolved/      ← cron job (cada 5 min)
├── lib/
│   ├── agent.js                        ← análisis con Groq
│   ├── slack.js                        ← helpers de Slack
│   ├── memory.js                       ← Vercel KV
│   └── github.js                       ← GitHub API
├── vercel.json                         ← config del cron
└── .env.example
```
