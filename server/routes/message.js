import express from "express";
import {
  handleGetMessages,
  handleSendMessage,
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const messageRouter = express.Router();

messageRouter.get("/:id", verifyToken, handleGetMessages); // id means receiverId
messageRouter.post("/:id", verifyToken, handleSendMessage); // id means receiverId

export { messageRouter };
