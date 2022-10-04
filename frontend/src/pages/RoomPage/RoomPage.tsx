import { Button, Flex, useToast, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MATCH_FAIL, MATCH_LEAVE } from "~/constants";
import useMatchStore from "~/store/matchStore";

import CollabContainer from "./components/CollabContainer/CollabContainer";
import LeaveRoomModal from "./components/LeaveRoomModal";

const RoomPage = () => {
  const navigate = useNavigate();
  const matchState = useMatchStore((state) => state);
  const { userId, roomId, socket, clearMatchState } = matchState;
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isOtherUserDisconnected =
    userId === "" || roomId === -1 || socket == null;

  useEffect(() => {
    if (isOtherUserDisconnected) {
      toast({
        title: "User has disconnected",
        status: "warning",
        isClosable: true,
        duration: null,
      });
    }
  }, [isOtherUserDisconnected]);

  const navigateToHome = () => navigate("/home");

  const leaveRoomHandler = () => {
    if (!isOtherUserDisconnected) {
      socket.emit(MATCH_LEAVE, { roomid: roomId });
    }
    navigateToHome();
  };

  socket?.on(MATCH_FAIL, () => {
    clearMatchState();
  });

  return (
    <Flex direction="column" height="90vh">
      <CollabContainer />
      <Button onClick={onOpen}>Leave Room</Button>
      <LeaveRoomModal
        isOpen={isOpen}
        onClose={onClose}
        leaveRoom={leaveRoomHandler}
      />
    </Flex>
  );
};

export default RoomPage;
