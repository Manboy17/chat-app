import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
})

export function getSocketId(userId) {
    return activeUsers[userId];
}

const activeUsers = {};

io.on("connection", (socket) => {
   console.log("User connected: " + socket.id);

   const userId = socket.handshake.query.userId;
   if (userId) {
       activeUsers[userId] = socket.id;
   }

   io.emit("online_users", Object.keys(activeUsers));

   socket.on("disconnect", () => {
         console.log("User disconnected: " + socket.id);
         delete activeUsers[userId];
         io.emit("online_users", Object.keys(activeUsers));
   })
});

export {io, app, server};