import { useRef, useState } from "react";
import { useChat } from "../store/useChat";
import { IoCloseSharp } from "react-icons/io5";
import { Input } from "./ui/input";
import { BsFolderPlus } from "react-icons/bs";
import { Button } from "./ui/button";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendMessage } = useChat();
  const [isMessageSending, setIsMessageSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsMessageSending(true);

    try {
      await sendMessage({
        content: message,
        image,
      });

      setMessage("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log(error);
    } finally {
      setIsMessageSending(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file?.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full mt-5">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <button
              onClick={handleRemoveImage}
              className="absolute -right-5 w-5 h-5 rounded-full flex items-center justify-center"
            >
              <IoCloseSharp size={28} />
            </button>
            <img
              src={image}
              alt="image"
              className="w-20 h-20 object-cover rounded-lg border"
            />
          </div>
        </div>
      )}

      <form
        className="flex items-center space-x-5"
        onSubmit={handleSendMessage}
      >
        <Input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleChangeImage}
        />

        <button type="button" onClick={() => fileInputRef.current?.click()}>
          <BsFolderPlus size={28} />
        </button>

        <Button type="submit" disabled={(!message && !image) || isMessageSending}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
