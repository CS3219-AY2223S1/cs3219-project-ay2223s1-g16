import create from "zustand";
import { Socket } from "socket.io-client";

export type Question = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topics: [string];
};

interface MatchState {
  roomId: number;
  userId: string;
  question: Question | null;
  socket: Socket | null;
  newMatchState: (
    roomId: number,
    userId: string,
    question: Question,
    socket: Socket
  ) => void;
  clearMatchState: () => void;
}

const useMatchStore = create<MatchState>((set) => ({
  roomId: -1,
  userId: "",
  socket: null,
  question: null,
  newMatchState: (
    roomId: number,
    userId: string,
    question: Question,
    socket: Socket
  ) => set((state) => ({ ...state, roomId, userId, question, socket })),
  clearMatchState: () =>
    set(() => ({ roomId: -1, userId: "", question: null, socket: null })),
}));

export default useMatchStore;
