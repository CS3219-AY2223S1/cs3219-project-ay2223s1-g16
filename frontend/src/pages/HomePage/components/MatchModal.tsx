import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { io, Socket } from "socket.io-client";

import useUserStore from "~/store/userStore";
import Timer from "./Timer";
import { MATCH_START, MATCH_REQUEST_NEW, MATCH_FAIL } from "../constants";

const MatchModal = ({
  isOpen,
  difficulty,
  onClose,
}: {
  isOpen: boolean;
  difficulty: string;
  onClose: () => void;
}) => {
  const loggedInUserId = useUserStore((state) => state.userId);
  const [initialTime, setInitialTime] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null); // TODO: put in global store if needed in future pages

  useEffect(() => {
    if (isOpen) {
      const clientSocket = io("http://localhost:8001"); //TODO: replace with env variable
      setSocket(clientSocket);
      clientSocket?.emit(MATCH_REQUEST_NEW, {
        userid: loggedInUserId,
        difficulty,
      });
    }
  }, [isOpen]);

  const retryHandler = () => {
    socket?.emit(MATCH_REQUEST_NEW, {
      userid: loggedInUserId,
      difficulty,
    });
  };

  const closeModal = () => {
    socket?.disconnect();
    setSocket(null);
    onClose();
  };

  socket?.on(MATCH_START, ({ timeout }: { timeout: number }) =>
    setInitialTime(timeout)
  );

  socket?.on(MATCH_FAIL, () => setInitialTime(0));

  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Matching on ${difficulty}...`}</ModalHeader>
        <ModalBody
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {initialTime > 0 ? (
            <Timer initial={initialTime} />
          ) : (
            <Button leftIcon={<RepeatClockIcon />} onClick={retryHandler}>
              Retry
            </Button>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={closeModal}>
            Cancel Matching
          </Button>
        </ModalFooter>
      </ModalContent>
      ;
    </Modal>
  );
};

export default MatchModal;
