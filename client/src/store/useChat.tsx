import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiRequest } from "../lib/apiUtils";
import { MessageInterface, UserInterface } from "../lib/types";

interface ChatInterface {
  messages: MessageInterface[];
  users: UserInterface[];
  currentUser: UserInterface | null;
  selectedUser: UserInterface | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;

  getUsers(): void;
  getCurrentUser(userid?: string): void;
  getMessages(userId?: string): void;
  sendMessage(message: MessageInterface): void;
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
      isMessagesLoading: false,

      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const users = await apiRequest("/users");
          set({ users });
        } catch (error) {
          console.error(error);
        } finally {
          set({ isUsersLoading: false });
        }
      },

      getCurrentUser: async (userId: string) => {
        try {
          const currentUser = await apiRequest(`/users/${userId}`);
          set({ currentUser });
        } catch (error) {
          console.error(error);
        }
      },

      getMessages: async (userId: string) => {
        set({ isMessagesLoading: true });
        try {
          const messages = await apiRequest(`/messages/${userId}`);
          set({ messages });
        } catch (error) {
          console.error(error);
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async (message: MessageInterface) => {
        const { selectedUser, messages } = get();
        try {
          await apiRequest(
            `/messages/${selectedUser?._id}`,
            "POST",
            JSON.stringify(message)
          );
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
