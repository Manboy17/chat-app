import { Link } from "react-router-dom";
import useAuth from "../store/useAuth";
import { useEffect, useState } from "react";
import { UserInterface } from "../lib/types";
import nonUser from "../assets/nonUser.jpg";

const User = () => {
  const { user } = useAuth();
  const [curUser, setCurUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3000/users/${user?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setCurUser(data);
    };

    fetchUser();
  }, [user?.id]);
  return (
    <Link
      to="/users/userId"
      className="flex items-center p-4 space-x-6 border-b"
    >
      <img
        src={curUser?.progileImage || nonUser}
        alt="user-photo"
        className="w-[70px] h-[70px] rounded-full object-cover cursor-pointer"
      />
      <span className="text-lg text-black font-medium">{curUser?.name}</span>
    </Link>
  );
};

export default User;
