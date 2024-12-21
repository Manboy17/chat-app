import { UserInterface } from "../lib/types";
import nonUser from "../assets/nonUser.jpg";
import { useChat } from "../store/useChat";

interface UserProps {
  user: UserInterface;
}

const User = ({ user }: UserProps) => {
  const { selectedUser, setSelectedUser } = useChat();
  return (
    <div
      className={`flex items-center justify-between hover:bg-gray-100 hover:rounded-md hover:transition cursor-pointer ${
        selectedUser?._id === user._id ? "bg-gray-100 rounded-md" : ""
      }`}
      onClick={() => setSelectedUser(user)}
    >
      <div className="w-full flex items-center justify-between p-2 space-x-4 border-b pb-2">
        <div className="flex items-center space-x-4">
          <img
            src={user?.progileImage || nonUser}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm font-light whitespace-nowrap">
              no messages...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
