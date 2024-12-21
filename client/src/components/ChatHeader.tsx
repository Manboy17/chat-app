import nonUser from "../assets/nonUser.jpg";
import { IoCloseSharp } from "react-icons/io5";
import { useChat } from "../store/useChat";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChat();
  return (
    <div className="flex items-center justify-between border-b pb-5">
      <div className="flex items-center space-x-4">
        <img
          src={selectedUser?.progileImage || nonUser}
          alt="user-profile-image"
          className="w-[70px] h-[70px] rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{selectedUser?.name}</h3>
          <p className="text-sm font-light">Last online yesterday!</p>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <IoCloseSharp size={28} />
      </button>
    </div>
  );
};

export default ChatHeader;
