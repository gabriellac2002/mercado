import { User } from "@/app/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      isAuthenticated: () => get().user !== null,
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
