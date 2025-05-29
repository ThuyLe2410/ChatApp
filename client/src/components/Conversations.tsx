
import { useConversations } from "../contexts/ConversationsProvider";
import type { ConversationProps } from "../type";

export default function Conversations() {
  const { conversations } = useConversations() as {
    conversations: ConversationProps[];
  };
  console.log("conversations", conversations);
  return (
    <div>
      {conversations.map((conversation, index) => (
        <div key={index}>
          {conversation.recipients.map((r) => (
            <ul>{r.name}</ul>
          ))}
        </div>
      ))}
    </div>
  );
}
