import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { ViewUpdate } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Results from "./Results";
import { io, Socket } from "socket.io-client";
import {
  CODE_CONNECT_NEW,
  CODE_DISCONNECT,
  CODE_JOINED,
  CODE_LEFT,
  CODE_UPDATE,
} from "~/constants";
import useUserStore from "~/store/userStore";
import useMatchStore from "~/store/matchStore";
import useCollabStore from "~/store/collabStore";

const PeerPrepCodeMirror = () => {
  const [code, setCode] = useState<string>('print("hello world!")');
  const [socket, setSocket] = useState<Socket | null>(null);
  const zustandRoomId = useMatchStore((state) => state.roomId);
  const zustandUsername = useUserStore((state) => state.username);
  const zustandUpdateState = useCollabStore((state) => state.newCollabState);

  const onChange = (value: string, viewUpdate: ViewUpdate) => {
    console.log("value:", value, viewUpdate);
    socket?.emit(CODE_UPDATE, { roomId: zustandRoomId, code: value });
  };

  useEffect(() => {
    const clientSocket = io(import.meta.env.VITE_COLLAB_SVC_URL);
    setSocket(clientSocket);
    clientSocket?.emit(CODE_CONNECT_NEW, {
      roomId: zustandRoomId,
      username: zustandUsername,
    });

    return () => {
      clientSocket.disconnect();
    };
  }, []);

  const codeJoinedHandler = (username: string) => {
    console.log(`${username} has joined the room`);
  };

  const codeLeftHandler = (message: string) => {
    console.log(message);
  };

  socket?.on(CODE_JOINED, codeJoinedHandler);

  socket?.on(CODE_LEFT, codeLeftHandler);

  socket?.on(CODE_UPDATE, (code) => {
    console.log(code);
    setCode(code);
  });

  return (
    <Flex
      direction={"column"}
      padding={2}
      minWidth="300px"
      width="50vw"
      height="100vh"
    >
      <CodeMirror
        basicSetup={true}
        value={code}
        height="70vh"
        theme={sublime}
        extensions={[python()]}
        onChange={onChange}
      />
      <Results />
    </Flex>
  );
};

export default PeerPrepCodeMirror;
