import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import CodeMirror from "@uiw/react-codemirror";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { ViewUpdate } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { io, Socket } from "socket.io-client";
import { debounce } from "lodash";

import {
  CODE_CONNECT_NEW,
  CODE_JOINED,
  CODE_LEFT,
  CODE_UPDATE,
} from "~/constants";
import useUserStore from "~/store/userStore";
import useMatchStore from "~/store/matchStore";
import useCollabStore from "~/store/collabStore";
import Results from "./Results";

const PeerPrepCodeMirror = () => {
  const [code, setCode] = useState<string>('print("hello world!")');
  const [socket, setSocket] = useState<Socket | null>(null);
  const zustandRoomId = useMatchStore((state) => state.roomId);
  const zustandUsername = useUserStore((state) => state.username);
  const zustandUpdateState = useCollabStore((state) => state.newCollabState);

  const debouncedUpdate = debounce((value: string, viewUpdate: ViewUpdate) => {
    socket?.emit(CODE_UPDATE, { roomId: zustandRoomId, code: value });
  }, 300);

  const onChange = (value: string, viewUpdate: ViewUpdate) => {
    if (value !== code) {
      debouncedUpdate(value, viewUpdate);
    }
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
    setCode(code);
  });

  return (
    <Flex direction={"column"} padding={2} minWidth="300px" flex={1}>
      <CodeMirror
        basicSetup={true}
        value={code}
        theme={sublime}
        extensions={[python()]}
        onChange={onChange}
      />
      <Results />
    </Flex>
  );
};

export default PeerPrepCodeMirror;
