
import { useState } from "react";
import type { ContactProps, recipientType,createConversationProps } from "../type";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

export default function NewConversationModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { contacts } = useContacts() as { contacts: ContactProps[] };
  const {  createConversation } = useConversations() as {
    createConversation: createConversationProps;
  };
  const [selectedContact, setSelectedContact] = useState<recipientType[]>([]);
  console.log("selectedContact", selectedContact)

  function handleCheckboxChange(contactId: string, contactName: string) {
   setSelectedContact((prev) => {
    const existingIndex = prev.findIndex((recipient) => recipient.id === contactId);
    if (existingIndex!==-1) {
        return prev.filter((recipient) => recipient.id !== contactId)
    } else {
        return [...prev, {id:contactId, name: contactName}]
    }
   })
  }

  function onSubmit() {
    createConversation(selectedContact)
    closeModal();
  }
  return (
    <div
      className="bg-white rounded-lg border-2 border-gray-200 p-6"
      style={{ width: "384px", height: "50%" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          New conversation
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold">
          x
        </button>
      </div>

      <div>
        {contacts.map((contact) => (
          <div className="text-left mt-2.5">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(contact.id, contact.name)}
            />
            {contact.name}
          </div>
        ))}
        <button
          className="bg-blue-400 rounded mt-4 h-10 w-20 border-blue-500 border-2 text-white cursor-pointer hover:bg-blue-600"
          type="submit"
          onClick={onSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}
