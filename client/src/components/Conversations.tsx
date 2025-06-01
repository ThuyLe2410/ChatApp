import { useConversations } from "../contexts/ConversationsProvider";
import type { ConversationProps } from "../type";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations() as {
    conversations: ConversationProps[];
    selectConversationIndex: (index: number) => void;
  };
  console.log("conversations", conversations);
  return (
    <div>
      {conversations.map((conversation, index) => (
        <ul key={index} className="flex">
          <button
            className={`w-full h-10 text-left cursor-pointer ${
              conversation.selected
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "hover:bg-blue-300"
            }`}
            onClick={() => selectConversationIndex(index)}>
            <div className="ml-3">
              {conversation.recipients.map((r) => r.name).join(",")}
            </div>
          </button>
        </ul>
      ))}
    </div>
  );
}
