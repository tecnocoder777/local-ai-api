export default function handler(req, res) {
  const msg = req.query.msg || "";

  function reply(text) {
    text = text.toLowerCase();

    if (text.includes("hello"))
      return "Hello! How are you?";

    if (text.includes("name"))
      return "My name is Local AI.";

    if (text.includes("bye"))
      return "Bye! Take care.";

    return "I received your message: " + text;
  }

  res.send(reply(msg));
}
