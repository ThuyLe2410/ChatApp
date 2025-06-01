import type { ReactNode } from "react";
import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type {
    ContactProps,
  ConversationProps,
  ConversationsContextType,
  recipientType,
} from "../type";
import { useContacts } from "./ContactsProvider";

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
  const {contacts} = useContacts() as {contacts: ContactProps[]}

  function createConversation(recipients: recipientType[]) {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [], selected: false }];
    });
  }

  function addMessageToConversation({
    recipients,
    text,
    sender,
  }: {
    recipients: recipientType[];
    text: string;
    sender: string;
  }) {
    setConversations((prev) => {
      let madeChange = false;
      const newMessage = { sender: sender, text: text };
      const newConversations = prev.map((conversation) => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true;
          console.log("conversation", conversation);
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
  }

  function sendMessage(recipients: recipientType[], text: string) {
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map(
    (conversation: ConversationProps, index) => {
      const selected = index === selectedConversationIndex;

      const messages = conversation.messages.map(message => {
        const contact = contacts.find(contact => {
            return contact.id === message.sender
        })
        const name = (contact&& contact.name) || message.sender
        const fromMe = id === message.sender
        return {...message,senderName:name, fromMe}
      })

      return { ...conversation, selected };
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
    return elm === b[index];
  });
}
