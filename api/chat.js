export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const prompt = req.query.prompt;

  if (!prompt) {
    return res.json({ error: "prompt missing" });
  }

  try {
    const response = await fetch(
      "https://api.deepseek.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-1f4b40eb9b1b460a817e25c8785c6ee5"
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "user", content: prompt }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    // 🔥 REAL EXTRACTION (DeepSeek compatible)
    const reply =
      data?.choices?.[0]?.message?.content ??
      data?.choices?.[0]?.text ??
      "NO_REPLY";

    res.json({
      reply: reply
    });

  } catch (e) {
    res.json({ error: e.toString() });
  }
}
