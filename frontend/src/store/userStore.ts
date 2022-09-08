import create from "zustand";

const useUserStore = create((set) => ({
  isAuthenticated: false,
  userId: "",
  login: () => set((userId: string) => ({ isAuthenticated: true, userId })),
  logout: () =>
    set((userId: string) => ({ isAuthenticated: false, userId: "" })),
}));

export default useUserStore;
