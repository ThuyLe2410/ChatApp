import { useState, useRef, useEffect } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import type { sendMessageProps, ConversationProps } from "../type";

export default function OpenConversation() {
  const [text, setText] = useState<string>("");
  const lastMessageRef = useRef<HTMLInputElement>(null);
  const { sendMessage, selectedConversation } = useConversations() as {
    sendMessage: sendMessageProps;
    selectedConversation: ConversationProps;
  };

  function handleSubmit() {
    if (text.trim()) {
      sendMessage(selectedConversation.recipients, text);
      setText("");
    }
  }
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
  console.log("selectedConversation", selectedConversation);
  return (
    <div className="flex flex-col justify-between grow ">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col grow justify-end px-3 items-start gap-1  ">
          {selectedConversation.messages.map((message, index) => {
            return (
              <div
                ref={lastMessageRef}
                key={index}
                className={`flex flex-col  ${
                  message.fromMe ? "self-end items-end" : "items-start"
                }`}>
                <div
                  className={`rounded-xl px-2 py-1 ${
                    message.fromMe ? "bg-blue-400 text-white" : "border-2"
                  }`}>
                  {message.text}
                </div>
                <div
                  className={`text-gray-400 text-sm ${
                    message.fromMe ? "text-right" : ""
                  }`}>
                  {" "}
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex h-28 border-b-blue-200 border-1 rounded-2xl">
        <textarea
          className="grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-blue-600 text-white w-20 cursor-pointer rounded-r-2xl"
          onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}
