import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="bg-white shadow p-4 w-full lg:w-3/4 rounded-lg flex flex-col">
      <ChatHeader />

      <Messages />

      <MessageInput />
    </div>
  );
};

export default Chat;
