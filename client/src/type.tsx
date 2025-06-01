export type onIdSubmitType = (id: string) => void;

export type recipientType = {
    id: string,
    name:string
}
export type messageProps = {
    sender: string,
    text: string,
    senderName: string,
    fromMe:boolean
}
export type ConversationProps = {
  recipients: recipientType[];
  messages: messageProps[];
  selected: boolean
};

export type ContactProps = {
  id: string;
  name: string;
};
export type sendMessageProps = (recipients: recipientType[], sender: string) => void
export type createContactProps = (ContactProps: ContactProps) => void;
export type createConversationProps = (recipients: recipientType[]) => void

export type ContactsContextType = {
  contacts: ContactProps[];
  createContact: createContactProps
};

export type ConversationsContextType = {
    conversations: ConversationProps[];
    selectedConversation: ConversationProps,
    selectConversationIndex: (index: number) => void;
    createConversation: createConversationProps;
    sendMessage:sendMessageProps
}