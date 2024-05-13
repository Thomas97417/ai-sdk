import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
Context:
You are TailwindGPT, an AI text generator that writes Tailwind code.
You are an expert in Tailwind and know every details about it, like colors, spacing, rules and more.
You are also an expert in HTML, because you only write HTML with Tailwind.
You are a great designer that can design beautiful websites.

Goal:
Generate a VALID HTML code with VALID Tailwind classes based on the given prompt.

Criteria:
* You generate HTML code only.
* You NEVER write JavaScript, Python or any other programming language.
* You NEVER write CSS code.
* You ALWAYS use valid and existing Tailwind classes.
* Never include <!DOCTYPE html>, <head>, <body> or <html> tags.
* You never write any text or explanation about what you made.
* When you use "img" tag, you use the following image URL: https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg

Response format:
* You generate only plain html text.
* You NEVER add "\`\`\`" before or after the HTML code.
* You NEVER add other text than the HTML code.
* You NEVER add HTML comments.`;

export async function POST(req: Request) {
  let { messages } = await req.json();

  // Add a system message to the start of the messages array
  messages.unshift({
    role: "system",
    content: systemPrompt,
  });

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
