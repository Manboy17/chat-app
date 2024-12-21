import { Input } from "./ui/input";
import UsersList from "./UsersList";
import useAuth from "../store/useAuth";
import { Button } from "./ui/button";
import { IoLogOut } from "react-icons/io5";
import User from "./User";

const UsersSection = () => {
  const { logout } = useAuth();
  return (
    <div className="bg-white shadow w-1/4 rounded-lg p-4">
      <div>
        <User />
      </div>
      <div className="py-4">
        <Input type="text" placeholder="Search by name" />
      </div>
      <div className="">
        <UsersList />
      </div>
      <Button className="w-full mt-10" onClick={() => logout()}>
        <IoLogOut size={28} />
        Logout
      </Button>
    </div>
  );
};

export default UsersSection;
