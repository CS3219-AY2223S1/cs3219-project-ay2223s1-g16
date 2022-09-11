import { HStack, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MATCH_FAIL, MATCH_LEAVE } from "~/constants";

import useMatchStore from "~/store/matchStore";

const RoomPage = () => {
  const navigate = useNavigate();
  const matchState = useMatchStore((state) => state);
  const { userId, roomId, socket, clearMatchState } = matchState;

  const isOtherUserDisconnected =
    userId === "" || roomId === -1 || socket == null;

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
    <HStack sx={{ padding: 6 }}>
      <Heading>
        {isOtherUserDisconnected
          ? "User has disconnected"
          : `Coding in room ${roomId} with ${userId}`}
        <Button sx={{ ml: 4 }} onClick={leaveRoomHandler}>
          Leave Room
        </Button>
      </Heading>
    </HStack>
  );
};

export default RoomPage;
