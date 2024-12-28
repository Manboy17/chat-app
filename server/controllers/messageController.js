import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getSocketId, io} from "../lib/socket.js";

export const handleGetMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
  }
};

export const handleSendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    const { content, image } = req.body;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const message = new Message({
      senderId,
      receiverId,
      content,
      image: imageUrl,
    });

    await message.save();

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", message);
    }

    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
  }
};
