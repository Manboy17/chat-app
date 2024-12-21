import { useRef, useState } from "react";
import { useChat } from "../store/useChat";
import { IoCloseSharp } from "react-icons/io5";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChat();

  const handleSendMessage = () => {};

  const handleRemoveImage = () => {};

  const handleChangeImage = () => {};

  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
              alt="image"
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -t-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            >
              <IoCloseSharp size={28} />
            </button>
          </div>
        </div>
      )}

      <h1>Message Input</h1>
    </div>
  );
};

export default MessageInput;
