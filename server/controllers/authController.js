import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../lib/schemas.js";
import User from "../models/user.model.js";

export const handleRegister = async (req, res) => {
  try {
    const validatedData = await registerSchema.validate(req.body, {
      abortEarly: false,
    });

    const { email, name, password } = validatedData;

    const existingEmail = await User.findOne({
      email,
    });

    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      name,
      password: hashedPwd,
    });

    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const handleLogin = async (req, res) => {
  try {
    const validatedData = await loginSchema.validate(req.body, {
      abortEarly: false,
    });

    const { email, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, existingUser.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "20h",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
};
