import express from "express";
import { handleUpdateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.put("/", verifyToken ,handleUpdateProfile);

export { userRouter };
