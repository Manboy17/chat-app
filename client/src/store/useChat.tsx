import {create} from "zustand";
import {MessageInterface, UserInterface} from "../lib/types";
import useAuth from "./useAuth.ts";
import {Socket} from "socket.io-client";

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
                const response = await fetch("http://localhost:3000/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                set({users: await response.json()});
            } catch (error) {
                console.error(error);
            } finally {
                set({isUsersLoading: false});
            }
        },

        getCurrentUser: async (userId: string) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/users/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                set({currentUser: await response.json()});
            } catch (error) {
                console.error(error);
            }
        },

        getMessages: async (userId: string) => {
            try {
                const response = await fetch(
                    `http://localhost:3000/messages/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                set({messages: await response.json()});
            } catch (error) {
                console.error(error);
            }
        },

        sendMessage: async (message: MessageInterface) => {
            const {selectedUser, messages} = get();
            try {
                const response = await fetch(
                    `http://localhost:3000/messages/${selectedUser?._id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(message),
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const newMessage = await response.json();

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

        setSelectedUser: (user: UserInterface) => {
            set({selectedUser: user});
        },
    }),
);
