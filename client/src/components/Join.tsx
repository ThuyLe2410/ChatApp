import { useState } from "react";
import { Link } from "react-router-dom";

export default function Join() {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <div className="flex justify-center align-middle items-center h-96 bg-gray-600">
      <div className="min-w-96">
        <h1 className="text-white font-extrabold text-2xl pb-1.5 border-b-2 border-white">
          {" "}
          Join
        </h1>
        <div>
          <input
            className="font-light p-2.5 w-full bg-white mt-3"
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            className="font-light p-2.5 w-full bg-white mt-3"
            placeholder="Room"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}>
          <button
            className="text-white! uppercase bg-blue-600 p-2.5 rounded-b-sm inline-block border-0 w-full mt-3"
            type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
