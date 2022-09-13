import { useState } from "react";
import {
  Button,
  Center,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import MatchModal from "./components/MatchModal";
import { EASY, HARD, MEDIUM } from "./constants";

const HomePage = () => {
  const [difficulty, setDifficulty] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (difficulty: string) => {
    onOpen();
    setDifficulty(difficulty);
  };

  return (
    <Center sx={{ height: "90vh" }}>
      <VStack>
        <Heading size="md" sx={{ mb: 2 }}>
          Select Difficulty:
        </Heading>
        <Button
          colorScheme="green"
          width="100%"
          onClick={() => openModal(EASY)}
        >
          Easy
        </Button>
        <Button
          colorScheme="teal"
          width="100%"
          onClick={() => openModal(MEDIUM)}
        >
          Medium
        </Button>
        <Button colorScheme="red" width="100%" onClick={() => openModal(HARD)}>
          Hard
        </Button>
      </VStack>
      <MatchModal isOpen={isOpen} onClose={onClose} difficulty={difficulty} />
    </Center>
  );
};

export default HomePage;
