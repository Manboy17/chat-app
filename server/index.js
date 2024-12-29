import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { messageRouter } from "./routes/message.js";
import {app, server} from "./lib/socket.js";

dotenv.config();

app.use(express.json());
app.use(cors(
    {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }
));

const PORT = process.env.PORT || 3001;

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
