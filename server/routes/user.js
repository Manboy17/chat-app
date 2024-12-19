import express from "express";
import {
  handleGetUserById,
  handleGetUsers,
  handleUpdateProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.put("/", verifyToken, handleUpdateProfile);
userRouter.get("/:id", verifyToken, handleGetUserById); // id means userId
userRouter.get("/", verifyToken, handleGetUsers);

export { userRouter };
