import { useForm } from "react-hook-form";
import type { ContactProps, createContactProps } from "../type";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewContactModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<ContactProps>();
  const { createContact } = useContacts() as {
    createContact: createContactProps;
  };

  function onSubmit(data: ContactProps) {
    createContact({ id: data.id, name: data.name });
    reset();
    closeModal();
  }

  return (
    <div
      className="bg-white rounded-lg border-2 border-gray-200 p-6"
      style={{ width: "384px", height: "50%" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">New contact</h2>
        <button
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold">
          {" "}
          x{" "}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <p className="text-left">Id</p>
          <input
            className="w-full h-10 border-1 border-gray-300 p-1"
            {...register("id", { required: true })}
          />
        </div>

        <div className="mt-3">
          <p className="text-left">Name</p>
          <input
            className="w-full h-10 border-1 border-gray-300 p-1"
            {...register("name", { required: true })}
          />
        </div>
        <button
          className="bg-blue-400 rounded mt-4 h-10 w-20 border-blue-500 border-2 text-white cursor-pointer hover:bg-blue-600"
          type="submit">
          {" "}
          Create
        </button>
      </form>
    </div>
  );
}
