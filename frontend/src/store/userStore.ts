import create from "zustand";

interface UserState {
  isAuthenticated: boolean;
  userId: string;
  login: (userId: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  userId: "",
  login: (userId: string) =>
    set((state) => ({ ...state, isAuthenticated: true, userId })),
  logout: () =>
    set((state) => ({ ...state, isAuthenticated: false, userId: "" })),
}));

export default useUserStore;
