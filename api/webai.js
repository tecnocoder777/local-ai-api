export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.json({ error: "No question" });

  const searchUrl =
    "https://duckduckgo.com/html/?q=" + encodeURIComponent(q);

  const response = await fetch(searchUrl);
  const html = await response.text();

  // Simple text extract
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .substring(0, 1000);

  res.json({
    question: q,
    answer: text.trim()
  });
}
