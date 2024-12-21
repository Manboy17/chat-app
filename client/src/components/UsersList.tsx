import { useEffect, useState } from "react";
import nonUser from "../assets/nonUser.jpg";
import { UserInterface } from "../lib/types";

const UsersList = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users", {
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
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">People</h2>
      <div className="flex flex-col space-y-4 pt-3 overflow-y-scroll overflow-hidden no-scrollbar max-h-[70vh]">
        {users.map((user: UserInterface) => (
          <div key={user._id} className="flex items-center justify-between">
            <div className="w-full flex items-center justify-between p-2 space-x-4 border-b pb-2 hover:bg-gray-100 hover:rounded-md hover:transition cursor-pointer">
              <div className="flex items-center space-x-4">
                <img
                  src={user.progileImage || nonUser}
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm font-light">no messages...</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
