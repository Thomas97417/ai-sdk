import { Loader } from "lucide-react";
import React from "react";

type InputFormProps = {
  loading: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChatSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputForm = ({
  handleChatSubmit,
  handleInputChange,
  input,
  loading,
}: InputFormProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mb-12">
      <div className="w-full max-w-xl mx-auto ">
        <form onSubmit={handleChatSubmit}>
          <div className="flex gap-2">
            <input
              className="w-full max-w-md p-2 border border-gray-300 rounded shadow-md"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-blue-400 px-2 rounded-md text-white shadow-md hover:bg-blue-500"
            >
              {loading ? (
                <Loader
                  size={24}
                  className="animate-spin"
                  style={{
                    animationDuration: "5s",
                  }}
                />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
