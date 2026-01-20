function ai(prompt) {
  prompt = prompt.toLowerCase();

  if (prompt.includes("hello"))
    return "Hello!";

  if (prompt.includes("name"))
    return "My name is Local AI";

  return "Thinking about " + prompt;
}
