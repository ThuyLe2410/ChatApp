
import { useContacts } from "../contexts/ContactsContext";
import type { ContactProps } from "../type";

export default function Contacts() {
  const { contacts } = useContacts() as {contacts: ContactProps[]};
  console.log("contacts", contacts);
  return (
    <div className="mt-10">
      {contacts.map((contact) => (
        <ul className="text-left mt-2" key={contact.id}>{contact.name}</ul>
      ))}
    </div>
  );
}
