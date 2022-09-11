import create from "zustand";

interface UserState {
  isAuthenticated: boolean;
  userId: string;
  username: string;
  login: (userId: string, username: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  userId: "",
  username: "",
  login: (userId: string, username: string) =>
    set((state) => ({ ...state, isAuthenticated: true, userId, username })),
  logout: () =>
    set((state) => ({
      ...state,
      isAuthenticated: false,
      userId: "",
      username: "",
    })),
}));

export default useUserStore;
