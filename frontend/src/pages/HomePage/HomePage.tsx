import { useState } from "react";
import {
  Button,
  Center,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";

import useUserStore from "~/store/userStore";
import MatchModal from "./components/MatchModal";
import { EASY, HARD, MATCH_REQUEST_NEW, MEDIUM } from "./constants";

const HomePage = () => {
  const loggedInUserId = useUserStore((state) => state.userId);
  const [difficulty, setDifficulty] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null); // TODO: put in global store since its needed in future pages
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (difficulty: string) => {
    onOpen();
    setDifficulty(difficulty);
    const clientSocket = io("http://localhost:8001"); //TODO: replace with env variable
    setSocket(clientSocket);
    clientSocket.emit(MATCH_REQUEST_NEW, {
      userid: loggedInUserId,
      difficulty,
    });
  };

  const closeModal = () => {
    socket?.disconnect();
    setSocket(null);
    onClose();
  };

  return (
    <Center sx={{ height: "90vh" }}>
      <VStack>
        <Heading size="md" sx={{ mb: 2 }}>
          Select Difficulty:
        </Heading>
        <Button colorScheme="green" onClick={() => openModal(EASY)}>
          Easy
        </Button>
        <Button colorScheme="teal" onClick={() => openModal(MEDIUM)}>
          Medium
        </Button>
        <Button colorScheme="red" onClick={() => openModal(HARD)}>
          Hard
        </Button>
      </VStack>
      <MatchModal
        isOpen={isOpen}
        closeModal={closeModal}
        difficulty={difficulty}
      />
    </Center>
  );
};

export default HomePage;
