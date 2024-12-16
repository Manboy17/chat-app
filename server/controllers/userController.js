import { updateUserSchema } from "../lib/schemas";

export const handleUpdateProfile = async (req, res) => {
  try {
    const validatedData = await updateUserSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { name, profileImage } = validatedData;
    const userId = req.user._id;

    
  } catch (error) {
    console.error(error);
  }
};
