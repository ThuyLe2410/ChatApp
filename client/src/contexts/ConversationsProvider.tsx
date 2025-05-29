import type { ReactNode } from "react";
import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type {  ConversationProps, ConversationsContextType, recipientType } from "../type";

const ConversationsContext =
  React.createContext<ConversationsContextType|undefined>(undefined);

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useLocalStorage<ConversationProps[]>(
    "conversations",
    []
  );
//   const {contacts} = useContacts() as {contacts: ContactProps[]}

  function createConversation(recipients: recipientType[]) {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  }

//   const formattedConversations = conversations.map(conversation => {
//     const recipients = conversation.recipients.map(recipient => {
//         const contact = contacts.find(contact => {
//             return contact.id === recipient.id
//         })
//         const name = contact?.name || recipient.name;
//         return {id: recipient.id, name: name}
//     })
//     return {...conversation, recipients}
//   })

  return (
    <ConversationsContext.Provider value={{ conversations, createConversation }}>
      {children}
    </ConversationsContext.Provider>
  );
}
