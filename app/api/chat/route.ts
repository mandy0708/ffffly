export const runtime = 'edge'

const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

const PRIMARY_MODEL = 'deepseek/deepseek-chat-v3:free'
const FALLBACK_MODEL = 'meta-llama/llama-3.3-70b-instruct:free'

// TODO: 补充"AI 版张曼"的人设内容
const SYSTEM_PROMPT = `你是"AI 版张曼"。`

type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function callOpenRouter(model: string, messages: ChatMessage[], apiKey: string) {
  return fetch(OPENROUTER_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://zhangman.net',
      'X-Title': 'AI 版张曼',
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  })
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Missing OPENROUTER_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body: { messages?: ChatMessage[] }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(body.messages ?? []),
  ]

  // 先试主模型，失败时 fallback 到备用模型
  let upstream = await callOpenRouter(PRIMARY_MODEL, messages, apiKey)
  if (!upstream.ok || !upstream.body) {
    upstream = await callOpenRouter(FALLBACK_MODEL, messages, apiKey)
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '')
    return new Response(
      JSON.stringify({ error: 'OpenRouter request failed', detail }),
      { status: 502, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // 保留流式输出，直接把上游 SSE 转发给客户端
  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
