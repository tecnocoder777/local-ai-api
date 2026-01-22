export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.json({ status: false, error: "prompt missing" });
    }

    const r = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-1f4b40eb9b1b460a817e25c8785c6ee5"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await r.json();

    // 🔥 SAFE RESPONSE READ
    let reply = "No response";

    if (
      data &&
      data.choices &&
      data.choices.length > 0 &&
      data.choices[0].message &&
      data.choices[0].message.content
    ) {
      reply = data.choices[0].message.content;
    }

    res.json({
      status: true,
      prompt: prompt,
      reply: reply
    });

  } catch (err) {
    res.json({
      status: false,
      error: err.message
    });
  }
}
