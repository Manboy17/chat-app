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
