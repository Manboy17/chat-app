import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInterface {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

interface UseAuth {
  user: UserInterface | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuth = create(
  persist<UseAuth>(
    (set) => ({
      user: null,

      login: (token: string) => {
        localStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));

        set({
          user: payload,
        });
      },

      logout: () => {
        localStorage.removeItem("token");

        set({
          user: null,
        });
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuth;
