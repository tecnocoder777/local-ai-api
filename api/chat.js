import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const msg = (req.query.msg || "").toLowerCase();

  const filePath = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // direct match
  if (data[msg]) {
    return res.send(data[msg]);
  }

  // partial match
  for (let key in data) {
    if (msg.includes(key)) {
      return res.send(data[key]);
    }
  }

  res.send("Sorry, I don't understand");
}
