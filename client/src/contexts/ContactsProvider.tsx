import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { ContactProps, ContactsContextType } from "../type";

const ContactsContext = React.createContext<ContactsContextType | undefined>(
  undefined
);

export function useContacts() {
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useLocalStorage<ContactProps[]>("contacts", []);
  //check contact is You? 
  function createContact({ id, name }: ContactProps) {
    setContacts((prevContacts: ContactProps[]) => {
      return [...prevContacts, { id, name }];
    });
  }
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
