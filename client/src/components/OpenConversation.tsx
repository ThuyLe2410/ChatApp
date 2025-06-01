import { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import type { sendMessageProps, ConversationProps } from "../type";

export default function OpenConversation() {
  const [text, setText] = useState<string>("");
  const { sendMessage, selectedConversation } = useConversations() as {
    sendMessage: sendMessageProps,
    selectedConversation: ConversationProps,
  };

  function handleSubmit() {
    sendMessage(
      selectedConversation.recipients,
      text
    );
    setText("");
  }
  console.log('selectedConversation', selectedConversation)
  return (
    <div className="flex flex-col justify-between grow">
      <div className="flex grow">class</div>
      <div className="flex h-28 border-b-blue-200 border-1 rounded-2xl">
        <textarea
          className="grow"
          value={text}
          onChange={(e) => setText(e.target.value)}
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
