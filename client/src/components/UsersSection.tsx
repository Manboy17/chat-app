import {Input} from "./ui/input";
import UsersList from "./UsersList";
import useAuth from "../store/useAuth";
import {Button} from "./ui/button";
import {IoLogOut} from "react-icons/io5";
import UserLogo from "./UserLogo";
import {useChat} from "../store/useChat";
import {useSearch} from "../hooks/useSearch.ts";
import {useEffect, useState} from "react";
import {useDebounce} from "../hooks/useDebounce.ts";

const UsersSection = () => {
    const {logout} = useAuth();
    const {setSelectedUser, searchUsers} = useChat();
    const {search, setSearch} = useSearch();
    const [localSearch, setLocalSearch] = useState(search);
    const debouncedSearch = useDebounce(localSearch);

    useEffect(() => {
        setSearch({
            search: debouncedSearch,
        })
    }, [setSearch, debouncedSearch]);

    useEffect(() => {
        searchUsers(search);
    }, [search, searchUsers]);

    const handleLogout = () => {
        logout();
        setSelectedUser(null);
    };
    return (
        <div className="bg-white shadow w-1/4 rounded-lg p-4">
            <div>
                <UserLogo/>
            </div>
            <div className="py-4">
                <Input type="text" placeholder="Search by name" value={localSearch}
                       onChange={(e) => setLocalSearch(e.target.value)}/>
            </div>
            <div>
                <UsersList/>
            </div>
            <Button className="w-full mt-10" onClick={handleLogout}>
                <IoLogOut size={28}/>
                Logout
            </Button>
        </div>
    );
};

export default UsersSection;
