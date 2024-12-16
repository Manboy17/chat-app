import express from "express";
import { handleLogin, handleRegister } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/users", handleRegister);
authRouter.post("/tokens", handleLogin);

export { authRouter };
