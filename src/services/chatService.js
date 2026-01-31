import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
  },
});
/*
export async function getBotReply(conversation) {
  try {
    const response = await api.post("", {
      model: "gpt-3.5-turbo",
      messages: conversation.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error("AI service unavailable");
  }
}
*/
export async function getBotReply(conversation) {
  await new Promise((r) => setTimeout(r, 600));
  const last = conversation
    .filter((m) => m.sender === "user")
    .slice(-1)[0]?.text;

  return `You said: "${last}". I’m a mock AI for testing.`;
}
