import express from "express";
import http from "http";
import { Server } from "socket.io";
import router from "./router";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on('disconnected', () => {
    console.log(`user disconnected ${socket.id}`)
  })
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
