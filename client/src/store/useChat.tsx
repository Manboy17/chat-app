import {create} from "zustand";
import {MessageInterface, UserInterface} from "../lib/types";
import useAuth from "./useAuth.ts";
import {Socket} from "socket.io-client";
import {apiRequest, apiUrl} from "../lib/utils.ts";

interface SendMessageInterface {
    content: string | null;
    image: string | null;
}

interface ChatInterface {
    messages: MessageInterface[];
    users: UserInterface[];
    currentUser: UserInterface | null;
    selectedUser: UserInterface | null;
    isUsersLoading: boolean;

    getUsers(): void;

    getCurrentUser(userid?: string): void;

    getMessages(userId?: string): void;

    sendMessage(message: SendMessageInterface): void;

    subscribeToMessages(): void;

    unsubscribeFromMessages(): void;

    setSelectedUser(user: UserInterface | null): void;

    searchUsers(search: string | null): void;
}

export const useChat = create<ChatInterface>(
    (set, get) => ({
        messages: [],
        users: [],
        currentUser: null,
        selectedUser: null,
        isUsersLoading: false,

        getUsers: async () => {
            set({isUsersLoading: true});
            try {
                const users = await apiRequest(`${apiUrl}/users`);
                set({users});
            } catch (error) {
                console.error(error);
            } finally {
                set({isUsersLoading: false});
            }
        },

        getCurrentUser: async (userId: string) => {
            try {
                const currentUser = await apiRequest((`${apiUrl}/users/${userId}`))
                set({currentUser});
            } catch (error) {
                console.error(error);
            }
        },

        getMessages: async (userId: string) => {
            try {
                const messages = await apiRequest(`${apiUrl}/messages/${userId}`)
                set({messages});
            } catch (error) {
                console.error(error);
            }
        },

        sendMessage: async (message: MessageInterface) => {
            const {selectedUser, messages} = get();
            try {
                const newMessage = await apiRequest(`${apiUrl}/messages/${selectedUser?._id}`, "POST", message);
                set({messages: [...messages, newMessage]});
            } catch (error) {
                console.error(error);
            }
        },

        subscribeToMessages: () => {
            const {selectedUser} = get();
            if (!selectedUser) return;

            const socket = useAuth.getState().socket as Socket;

            socket.on("new_message", (message: MessageInterface) => {
                console.log("received message!");
                if (message.senderId !== selectedUser._id) return;
                set({
                    messages: [...get().messages, message],
                })
            });
        },
        unsubscribeFromMessages: () => {
            const socket = useAuth.getState().socket as Socket;

            socket.off("new_message");
        },

        searchUsers: async (search: string) => {
            try {
                const users = await apiRequest(`${apiUrl}/users/search?search=${search}`);
                set({users});
            } catch (error) {
                console.error(error);
            }
        },

        setSelectedUser: (user: UserInterface) => {
            set({selectedUser: user});
        },
    }),
);
