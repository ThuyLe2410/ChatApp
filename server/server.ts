import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./router";
import cors from "cors";
import { addUser, removeUser, getUser, getUserInRoom } from "./users";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  // join chatroom
  socket.on("join", ({ name, room }, callback) => {
    console.log("join", socket.id, name, room);
    const { error, user } = addUser({
      id: socket.id,
      name: name,
      room: room,
    });
    if (error) return callback(error);
    if (!user) return 

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(user.room);
    callback();
  });

  // send Message
  socket.on('sendMessage', (message, callback)=> {
    console.log('onSMS', socket.id)
    const user = getUser(socket.id);
    console.log('user', user)
    if (user) {
        io.to(user.room).emit('message', {user: user.name, text: message})
    }
  })

  // leave chatroom
  socket.on("leave", ({ name, room }) => {
    console.log(`user left ${name} ${room}`);
  });

});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
