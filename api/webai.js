export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.json({ error: "Question missing" });

  // Wikipedia se direct answer (safe & legal)
  const wikiUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(q);

  try {
    const r = await fetch(wikiUrl);
    const data = await r.json();

    res.json({
      question: q,
      answer: data.extract || "No clear answer found"
    });
  } catch (e) {
    res.json({ error: "Failed to fetch answer" });
  }
}
