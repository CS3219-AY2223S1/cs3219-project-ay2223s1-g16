import create from "zustand";
import { Socket } from "socket.io-client";

interface CollabState {
  roomId: number;
  userId: string;
  socket: Socket | null;
  newCollabState: (roomId: number, userId: string, socket: Socket) => void;
  clearCollabState: () => void;
}

const useCollabStore = create<CollabState>((set) => ({
  roomId: -1,
  userId: "",
  socket: null,
  newCollabState: (roomId: number, userId: string, socket: Socket) =>
    set((state) => ({ ...state, roomId, userId, socket })),
  clearCollabState: () => set(() => ({ roomId: -1, userId: "", socket: null })),
}));

export default useCollabStore;
