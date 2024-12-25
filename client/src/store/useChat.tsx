import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MessageInterface, UserInterface } from "../lib/types";

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
  setSelectedUser(user: UserInterface | null): void;
}

export const useChat = create(
  persist<ChatInterface>(
    (set, get) => ({
      messages: [],
      users: [],
      currentUser: null,
      selectedUser: null,
      isUsersLoading: false,

      getUsers: async () => {
        set({ isUsersLoading: true });
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
          set({ users: await response.json() });
        } catch (error) {
          console.error(error);
        } finally {
          set({ isUsersLoading: false });
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
          set({ currentUser: await response.json() });
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

          set({ messages: await response.json() });
        } catch (error) {
          console.error(error);
        }
      },

      sendMessage: async (message: MessageInterface) => {
        const { selectedUser, messages } = get();
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
            }
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          set({ messages: [...messages, message] });
        } catch (error) {
          console.error(error);
        }
      },

      setSelectedUser: (user: UserInterface) => {
        set({ selectedUser: user });
      },
    }),
    {
      name: "chatState",
    }
  )
);
