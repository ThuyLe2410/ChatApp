export type onIdSubmitType = (id: string) => void;

export type ConversationProps = {
  id: string;
  name: string;
};

export type ContactProps = {
  id: string;
  name: string;
};
export type createContactProps = (ContactProps: ContactProps) => void;

export type ContactsContextType = {
  contacts: ContactProps[];
  createContact: createContactProps
};
