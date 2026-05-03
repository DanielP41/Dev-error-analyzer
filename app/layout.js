export const metadata = {
  title: 'Dev Error Analyzer',
  description: 'AI-powered Slack bot that analyzes errors automatically.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}