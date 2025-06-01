import { useState, type ReactElement } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";
const tabContent: Record<string, ReactElement> = {
  [CONVERSATIONS_KEY]: <Conversations />,
  [CONTACTS_KEY]: <Contacts />,
};

export default function Sidebar({ id }: { id: string }) {
  const [activeKey, setActiveKey] = useState<string>(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }
  return (
    <div className="relative h-full w-96 bg-white border-r-2 border-gray-200">
      <div className="h-full flex flex-col relative">
        <div className="flex">
          <button
            className={`flex-1 p-2 cursor-pointer  ${
              activeKey === CONVERSATIONS_KEY
                ? "bg-white font-semibold border-t-2 border-l-2 border-r-2 border-gray-300 "
                : "bg-gray-100 border-b-2 border-gray-300 text-blue-600"
            }`}
            onClick={() => setActiveKey(CONVERSATIONS_KEY)}>
            Conversations
          </button>
          <button
            className={`flex-1 p-2 cursor-pointer   ${
              activeKey === CONTACTS_KEY
                ? "bg-white font-semibold border-t-2 border-l-2 border-r-2 border-gray-300"
                : "bg-gray-100  border-b-2 border-gray-300 text-blue-600"
            }`}
            onClick={() => setActiveKey(CONTACTS_KEY)}>
            Contacts
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 border-r-2 border-gray-200 overflow-auto">
          {tabContent[activeKey]}
        </div>

        {/* UserId display */}
        <div className="border-t-2 border-gray-200 p-2.5">
          Your Id: <span className="font-light text-gray-500">{id}</span>
        </div>

        <button
          className="bg-blue-500 text-white p-2 w-full hover:bg-blue-600 transition-colors"
          onClick={() => setModalOpen(true)}>
          New {activeKey === CONVERSATIONS_KEY ? "Conversation" : "Contact"}
        </button>
      </div>

      {modalOpen && (
        <>
          <div className="absolute inset-0 bg-gray-300 opacity-60 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {activeKey === CONVERSATIONS_KEY ? (
              <NewConversationModal closeModal={closeModal} />
            ) : (
              <NewContactModal closeModal={closeModal} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
