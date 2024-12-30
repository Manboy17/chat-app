import { useEffect } from "react";
import { UserInterface } from "../lib/types";
import { useChat } from "../store/useChat";
import User from "./User";

const UsersList = () => {
  const { users, getUsers, isUsersLoading } = useChat();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="relative">
      {isUsersLoading ? (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold">People</h2>
          {
            users.length > 0 ? (
                <div
                    className="flex flex-col space-y-4 pt-3 overflow-y-scroll overflow-hidden no-scrollbar max-h-[70vh]">
                  {users.map((user: UserInterface) => (
                      <User user={user} key={user._id}/>
                  ))}
                </div>
            ) : (
                <p className="text-sm font-semibold text-center mt-5">No users found!</p>
            )
          }
        </>
      )}
    </div>
  );
};

export default UsersList;
