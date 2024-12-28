import {UserInterface} from "../lib/types";
import nonUser from "../assets/nonUser.jpg";
import {useChat} from "../store/useChat";
import useAuth from "../store/useAuth.ts";

interface UserProps {
    user: UserInterface;
}

const User = ({user}: UserProps) => {
    const {onlineUsers} = useAuth();
    const {selectedUser, setSelectedUser} = useChat();
    return (
        <div
            className={`flex items-center justify-between hover:bg-gray-100 hover:rounded-md hover:transition cursor-pointer relative ${
                selectedUser?._id === user._id ? "bg-gray-100 rounded-md" : ""
            }`}
            onClick={() => setSelectedUser(user)}
        >
            {onlineUsers.includes(user._id) && (
                <div className="w-3 h-3 bg-green-500 rounded-full absolute top-3 left-10"/>
            )}
            <div className="w-full flex items-center justify-between p-2 space-x-4 border-b pb-2">
                <div className="flex items-center space-x-4">
                    <img
                        src={user?.profileImage || nonUser}
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
