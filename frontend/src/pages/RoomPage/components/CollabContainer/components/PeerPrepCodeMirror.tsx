import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { ViewUpdate } from "@codemirror/view";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { Flex, Box, useToast } from "@chakra-ui/react";
import { io, Socket } from "socket.io-client";
import { debounce } from "lodash";

import {
  CODE_CONNECT_NEW,
  CODE_JOINED,
  CODE_LANGUAGE,
  CODE_LEFT,
  CODE_UPDATE,
} from "~/constants";
import useUserStore from "~/store/userStore";
import useMatchStore from "~/store/matchStore";
import useCollabStore from "~/store/collabStore";
import Results from "./Results";
import LanguageMenu from "./LanguageMenu";
import { LanguageSupport } from "@codemirror/language";

const PeerPrepCodeMirror = () => {
  const [code, setCode] = useState<string>('print("hello world!")');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [languageExt, setLanguageExt] = useState<LanguageSupport>(python());
  const [language, setLanguage] = useState<string>("Python");
  const toast = useToast();
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

  useEffect(() => {
    toast({
      title: `Language updated to ${language}`,
      status: "info",
      isClosable: true,
      duration: 3000,
    });
  }, [language]);

  const codeJoinedHandler = (username: string) => {
    console.log(`${username} has joined the room`);
  };

  const codeLeftHandler = (message: string) => {
    console.log(message);
  };

  const languages = new Map<string, LanguageSupport>();
  languages.set("Python", python());
  languages.set("C++", cpp());
  languages.set("Javascript", javascript());
  languages.set("Java", java());

  const changeLanguageHandler = (lang: string) => {
    const langExt = languages.get(lang);
    if (langExt === undefined) {
      setLanguage("Python");
      setLanguageExt(python());
    } else {
      setLanguage(lang);
      setLanguageExt(langExt);
    }
    setCode("// Write your code here");
  };

  const updateLanguageHandler = (lang: string) => {
    if (lang !== language) {
      changeLanguageHandler(lang);
      socket?.emit(CODE_LANGUAGE, { roomId: zustandRoomId, language: lang });
    }
  };

  socket?.on(CODE_JOINED, codeJoinedHandler);

  socket?.on(CODE_LEFT, codeLeftHandler);

  socket?.on(CODE_UPDATE, (code) => {
    setCode(code);
  });

  socket?.on(CODE_LANGUAGE, (lang) => {
    changeLanguageHandler(lang);
  });

  return (
    <Flex
      direction={"column"}
      padding={2}
      minWidth="300px"
      flex={1}
      justifyContent="space-between"
    >
      <Box>
        <LanguageMenu
          language={language}
          languages={Array.from(languages.keys())}
          updateLanguageHandler={updateLanguageHandler}
        />
        <CodeMirror
          basicSetup={true}
          value={code}
          theme={sublime}
          extensions={[languageExt]}
          onChange={onChange}
        />
      </Box>
      <Results />
    </Flex>
  );
};

export default PeerPrepCodeMirror;
