import type { ReactNode } from "react";
import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type {
  ContactProps,
  ConversationProps,
  ConversationsContextType,
  receiveMessageProps,
  recipientType,
} from "../type";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext<
  ConversationsContextType | undefined
>(undefined);

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const [conversations, setConversations] = useLocalStorage<
    ConversationProps[]
  >("conversations", []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts() as { contacts: ContactProps[] };
  const socket = useSocket();

  function createConversation(recipients: recipientType[]) {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [], selected: false }];
    });
  }


  const addMessageToConversation = useCallback(
    ({
      recipients,
      text,
      sender,
    }: {
      recipients: recipientType[];
      text: string;
      sender: string;
    }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender: sender, text: text };
        const newConversations = prev.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });
        if (madeChange) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },[setConversations] 
  );



  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (message: receiveMessageProps ) => {
        addMessageToConversation(message)
    }
    socket.on("receive-message", handleReceiveMessage);
    return () => {socket?.off("receive-message")};
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients: recipientType[], text: string) {
    socket?.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map(
    (conversation: ConversationProps, index) => {
      const selected = index === selectedConversationIndex;

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });

      return { ...conversation, messages, selected };
    }
  );

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        sendMessage,
        createConversation,
      }}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();
  return a.every((elm, index) => {
    return elm.id === b[index].id;
  });
}
