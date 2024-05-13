"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import InputForm from "./InputForm";
import { Section } from "./Section";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: () => setLoading(false),
  });
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Chat submit");
    setLoading(true);
    handleSubmit(e);
  };
  return (
    <Section>
      {messages.length > 1 ? (
        <div className="w-full h-[80%]">
          <iframe
            className="size-full"
            srcDoc={`<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8" />
                    <title>CodePen - Tailwind CSS</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
                  </head>
                  <body>
                    ${messages[messages.length - 1].content}
                  </body>
                </html>`}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="font-semibold text-3xl">
            Tell me something to generate
          </p>
        </div>
      )}

      <InputForm
        handleChatSubmit={handleChatSubmit}
        handleInputChange={handleInputChange}
        input={input}
        loading={loading}
      />
    </Section>
  );
}
