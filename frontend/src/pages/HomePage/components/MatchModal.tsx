import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

import useUserStore from "~/store/userStore";
import useMatchStore, { Question } from "~/store/matchStore";
import {
  MATCH_START,
  MATCH_REQUEST_NEW,
  MATCH_FAIL,
  MATCH_SUCCESS,
} from "~/constants";
import Timer from "./Timer";

const MatchModal = ({
  isOpen,
  difficulty,
  onClose,
}: {
  isOpen: boolean;
  difficulty: string;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const loggedInUsername = useUserStore((state) => state.username);
  const newMatchState = useMatchStore((state) => state.newMatchState);
  const [initialTime, setInitialTime] = useState<number | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isOpen) {
      const clientSocket = io(import.meta.env.VITE_MATCHING_SVC_URL, {
        path: "/api/match/socket.io/",
      });
      setSocket(clientSocket);
      clientSocket?.emit(MATCH_REQUEST_NEW, {
        username: loggedInUsername,
        difficulty,
      });
    }
  }, [isOpen]);

  const navigateToRoomPage = () => navigate("/room");

  const retryHandler = () => {
    socket?.emit(MATCH_REQUEST_NEW, {
      username: loggedInUsername,
      difficulty,
    });
  };

  const closeModal = () => {
    socket?.disconnect();
    setSocket(null);
    setInitialTime(null);
    onClose();
  };

  socket?.on(MATCH_START, ({ timeout }: { timeout: number }) =>
    setInitialTime(timeout)
  );

  socket?.on(MATCH_FAIL, () => setInitialTime(0));

  socket?.on(
    MATCH_SUCCESS,
    ({
      roomId,
      usernameOne,
      usernameTwo,
      question,
    }: {
      roomId: number;
      usernameOne: string;
      usernameTwo: string;
      question: Question;
    }) => {
      const otherUserId =
        usernameOne === loggedInUsername ? usernameTwo : usernameOne;
      newMatchState(roomId, otherUserId, question, socket);
      navigateToRoomPage();
    }
  );

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
          {initialTime === null ? (
            <Spinner />
          ) : initialTime > 0 ? (
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
