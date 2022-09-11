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
  useToast,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

import useUserStore from "~/store/userStore";
import useMatchStore from "~/store/matchStore";
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
  const toast = useToast();
  const navigate = useNavigate();
  const loggedInUserId = useUserStore((state) => state.userId);
  const newMatchState = useMatchStore((state) => state.newMatchState);
  const [initialTime, setInitialTime] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

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

  const navigateToRoomPage = () => navigate("/room");

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

  socket?.on(
    MATCH_SUCCESS,
    ({
      roomId,
      userIdOne,
      userIdTwo,
    }: {
      roomId: number;
      userIdOne: string;
      userIdTwo: string;
    }) => {
      const otherUserId = userIdOne === loggedInUserId ? userIdTwo : userIdOne;
      newMatchState(roomId, otherUserId, socket);
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
