export type onIdSubmitType = (id: string) => void;

export type recipientType = {
    id: string,
    name:string
}
export type ConversationProps = {
  recipients: recipientType[];
  messages: string[];
};


export type ContactProps = {
  id: string;
  name: string;
};
export type createContactProps = (ContactProps: ContactProps) => void;
export type createConversationProps = (recipients: recipientType[]) => void

export type ContactsContextType = {
  contacts: ContactProps[];
  createContact: createContactProps
};

export type ConversationsContextType = {
    conversations: ConversationProps[];
    createConversation: createConversationProps;
}