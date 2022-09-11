import create from "zustand";

interface MatchState {
  roomId: number;
  userId: string;
  newMatchState: (roomId: number, userId: string) => void;
  clearMatchState: () => void;
}

const useMatchStore = create<MatchState>((set) => ({
  roomId: -1,
  userId: "",
  newMatchState: (roomId: number, userId: string) =>
    set((state) => ({ ...state, roomId, userId })),
  clearMatchState: () => set((state) => ({ roomId: -1, userId: "" })),
}));

export default useMatchStore;
