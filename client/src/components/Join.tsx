import {useState} from "react";
import {Link} from "react-router-dom"

export default function Join() {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  
  return (<h1> Join</h1>);
}
