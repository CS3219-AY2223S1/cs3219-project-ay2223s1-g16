import create from "zustand";
import { Socket } from "socket.io-client";

interface MatchState {
  roomId: number;
  userId: string;
  socket: Socket | null;
  newMatchState: (roomId: number, userId: string, socket: Socket) => void;
  clearMatchState: () => void;
}

const useMatchStore = create<MatchState>((set) => ({
  roomId: -1,
  userId: "",
  socket: null,
  newMatchState: (roomId: number, userId: string, socket: Socket) =>
    set((state) => ({ ...state, roomId, userId, socket })),
  clearMatchState: () => set(() => ({ roomId: -1, userId: "", socket: null })),
}));

export default useMatchStore;
