export default async function handler(req, res) {
  // CORS (Android / Sketchware ke liye important)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    // GET parameter
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({
        status: false,
        error: "prompt parameter missing"
      });
    }

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
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

    const data = await response.json();

    // Clean response (sirf text)
    const reply = data.choices?.[0]?.message?.content || "No response";

    res.status(200).json({
      status: true,
      prompt: prompt,
      reply: reply
    });

  } catch (e) {
    res.status(500).json({
      status: false,
      error: e.toString()
    });
  }
}
