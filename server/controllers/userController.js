import cloudinary from "../lib/cloudinary.js";
import { updateUserSchema } from "../lib/schemas.js";
import User from "../models/user.model.js";

export const handleUpdateProfile = async (req, res) => {
  try {
    const validatedData = await updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { name, profileImage } = validatedData;
    const userId = req.user.id;

    if (!profileImage) {
      return res.status(400).json({
        message: "Profile image is required",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profileImage);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        profileImage: uploadResponse.secure_url,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
  }
};

export const handleGetUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById({ _id: id }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
};

export const handleGetUsers = async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

export const handleSearchUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserId = req.user.id;

    const users = await User.find({
      name: { $regex: new RegExp(search, "i")},
      _id: { $ne: currentUserId},
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};