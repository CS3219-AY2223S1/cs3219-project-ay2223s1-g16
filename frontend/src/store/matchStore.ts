import create from "zustand";
import { Socket } from "socket.io-client";

interface MatchState {
  roomId: number;
  userId: string;
  difficulty: string;
  socket: Socket | null;
  newMatchState: (
    roomId: number,
    userId: string,
    difficulty: string,
    socket: Socket
  ) => void;
  clearMatchState: () => void;
}

const useMatchStore = create<MatchState>((set) => ({
  roomId: -1,
  userId: "",
  difficulty: "",
  socket: null,
  newMatchState: (
    roomId: number,
    userId: string,
    difficulty: string,
    socket: Socket
  ) => set((state) => ({ ...state, roomId, userId, difficulty, socket })),
  clearMatchState: () =>
    set(() => ({ roomId: -1, userId: "", difficulty: "", socket: null })),
}));

export default useMatchStore;
