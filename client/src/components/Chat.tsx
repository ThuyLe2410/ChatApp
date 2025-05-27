import {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import io from 'socket.io-client';
import queryString from "query-string"
import { Socket } from "socket.io-client";

let socket: Socket
export default function Chat() {
    const [name, setName] = useState<string|null>("");
    const [room, setRoom] = useState<string|null>("")
    const ENDPOINT = 'http://localhost:3000'

    const location = useLocation();
    useEffect(() => {
        const {name, room} = queryString.parse(location.search) as { name: string, room: string};
        socket = io(ENDPOINT);
        console.log(socket)
        setName(name);
        setRoom(room)
        socket.emit('join', {name: name, room: room})
        return () => {
            socket.emit('leave', {name: name, room: room})
            socket.disconnect();
            socket.off()
        }
    }, [location])
  return <h1> Chat</h1>;
}
