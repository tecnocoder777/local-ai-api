import brain from "../data.json";

export default function handler(req, res) {
  const msg = (req.query.msg || "").toLowerCase();

  // direct match
  if (brain[msg]) {
    return res.send(brain[msg]);
  }

  // partial match
  for (let key in brain) {
    if (msg.includes(key)) {
      return res.send(brain[key]);
    }
  }

  res.send("Sorry, I don't understand");
}
