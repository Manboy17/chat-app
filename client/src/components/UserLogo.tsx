import {Link} from "react-router-dom";
import useAuth from "../store/useAuth";
import {useEffect} from "react";
import nonUser from "../assets/nonUser.jpg";
import {useChat} from "../store/useChat";

const UserLogo = () => {
    const {user} = useAuth();
    const {currentUser, getCurrentUser} = useChat();

    useEffect(() => {
        getCurrentUser(user?.id);
    }, [user, getCurrentUser]);

    return (
        <Link
            to={`/users/${currentUser?._id}`}
            className="flex items-center space-x-6 border-b pb-5"
        >
            <img
                src={currentUser?.profileImage || nonUser}
                alt="user-photo"
                className="w-[60px] h-[60px] rounded-full object-cover cursor-pointer"
            />
            <span className="text-lg text-black font-medium">
        {currentUser?.name}
      </span>
        </Link>
    );
};

export default UserLogo;
