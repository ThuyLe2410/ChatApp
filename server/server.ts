import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
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
  let id: string | undefined;
  let name: string | undefined
  const rawId = socket.handshake.query.id;
  console.log("rawId", rawId);
  if (typeof rawId === "string") {
    id = rawId;
  } else if (Array.isArray(rawId)) {
    id = rawId[0];
  }
  if (id) {
    socket.join(id);
  } else {
    socket.disconnect();
  }
  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient: { id: string; name: string }) => {
      const newRecipients = recipients.filter(
        (r: { id: string; name: string }) => r.id !== recipient.id
      );
      newRecipients.push({ id: id, name: name });
      console.log('newRecipients', newRecipients)
      socket.broadcast.to(recipient.id).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
