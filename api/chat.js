export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, system } = req.body

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-super-120b-a12b:free',
      messages: [
        { role: 'system', content: system },
        ...messages
      ]
    })
  })

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't respond right now."

  return res.status(200).json({
    content: [{ type: 'text', text }]
  })
}