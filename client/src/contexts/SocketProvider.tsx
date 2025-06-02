import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = React.createContext<Socket | undefined>(undefined);

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | undefined>();
  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      query: { id},
    });
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
