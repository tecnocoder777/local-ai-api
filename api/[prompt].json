export default function handler(req, res) {
  const { prompt } = req.query;

  const text = prompt.toLowerCase();

  let reply = "I am thinking about " + prompt;

  if (text.includes("hello"))
    reply = "Hello! I am your local AI.";

  else if (text.includes("name"))
    reply = "My name is Local AI Engine.";

  else if (text.includes("time"))
    reply = "Current time is " + new Date().toLocaleTimeString();

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(reply);
}
