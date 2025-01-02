import {create} from "zustand";
import {io, Socket} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

interface UserInterface {
    id: string;
}

interface UseAuth {
    user: UserInterface | null;
    checkToken: () => void;
    login: (token: string) => void;
    logout: () => void;
    onlineUsers: string[];
    socket: Socket | null;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

const useAuth = create<UseAuth>((set, get) => ({
    user: null,
    onlineUsers: [],
    socket: null,

    checkToken: () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000);

            if (payload.exp < currentTime) {
                get().logout();
                return;
            }

            set({
                user: payload,
            })
            get().connectSocket();
        } catch (error) {
            console.log(error);
        }
    },

    login: (token: string) => {
        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));

        set({
            user: payload,
        });
        get().connectSocket();
    },

    logout: () => {
        localStorage.removeItem("token");

        get().disconnectSocket();
        set({
            user: null,
        });
    },

    connectSocket: () => {
        const {user} = get();
        if (!user || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: user.id,
            }
        });
        socket.connect();

        set({socket});

        socket.on("online_users", (users) => {
            set({
                onlineUsers: users
            })
        })
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            console.log("Disconnecting socket");
            socket.disconnect();
        }
    },
}));

export default useAuth;
