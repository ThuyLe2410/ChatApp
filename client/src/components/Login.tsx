// rfc
import { useRef } from "react";
import {v4 as uuidV4} from 'uuid'
import type { onIdSubmitType } from "../type.tsx";

export default function Login({ onIdSubmit }: { onIdSubmit: onIdSubmitType }) {
  const idRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (idRef.current) {
      onIdSubmit(idRef.current.value);
    }
  }

  function createNewId() {
    onIdSubmit(uuidV4())
  }
  
  return (
    <div className="flex justify-center align-middle items-center h-96 bg-gray-600">
      <div className="min-w-96">
        <h1 className="text-white font-extrabold text-2xl pb-1.5 border-b-2 border-white">
          Login
        </h1>

        <div>
          <input
            className="font-light p-2.5 w-full bg-white mt-3"
            placeholder="Enter Your Id"
            required
            type="text"
            ref={idRef}
          />
        </div>
        <div className="flex justify-center gap-10 mt-4 text-white">
          <button
            className="text-white! bg-blue-600 hover:bg-blue-300 p-2.5 rounded-b-sm inline-block border-0  mt-2 cursor-pointer"
            onClick={handleSubmit}>
            Login
          </button>
          <button className="text-white! bg-blue-600  hover:bg-blue-300 p-2.5 rounded-b-sm inline-block border-0  mt-2 cursor-pointer"
          onClick={createNewId}>
            Create A New Id
          </button>
        </div>
      </div>
    </div>
  );
}
