export default async function handler(req, res) {
  const q = req.query.q;
  if (!q) return res.json({ answer: "Question missing" });

  // 1️⃣ DuckDuckGo instant answer
  try {
    const r = await fetch(
      "https://api.duckduckgo.com/?q=" +
      encodeURIComponent(q) +
      "&format=json&no_html=1&skip_disambig=1"
    );
    const d = await r.json();

    if (d.AbstractText) {
      return res.json({
        source: "duckduckgo",
        answer: d.AbstractText
      });
    }

    if (d.Answer) {
      return res.json({
        source: "duckduckgo",
        answer: d.Answer
      });
    }
  } catch {}

  // 2️⃣ Wikipedia fallback
  try {
    const w = await fetch(
      "https://en.wikipedia.org/api/rest_v1/page/summary/" +
      encodeURIComponent(q)
    );
    const j = await w.json();
    if (j.extract) {
      return res.json({
        source: "wikipedia",
        answer: j.extract
      });
    }
  } catch {}

  // 3️⃣ Honest reply
  res.json({
    source: "none",
    answer:
      "Is sawal ka short public answer available nahi hai. Thoda clear ya specific poochho."
  });
}
