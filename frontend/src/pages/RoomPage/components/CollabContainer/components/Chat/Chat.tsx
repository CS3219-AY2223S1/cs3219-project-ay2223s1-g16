import { Box, Collapse, Fade, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { CHAT_JOINED, CHAT_MESSAGE, CHAT_NEW, CHAT_TYPING } from "~/constants";
import useMatchStore from "~/store/matchStore";
import useUserStore from "~/store/userStore";
import ChatItem from "./ChatItem";
import InputBox from "./InputBox";

interface ChatItem {
  username: string;
  text: string;
  type: string;
}

const Chat = () => {
  const [chatItems, setItems] = useState<ChatItem[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const zustandRoomId = useMatchStore((state) => state.roomId);
  const zustandUsername = useUserStore((state) => state.username);

  useEffect(() => {
    const clientSocket = io(import.meta.env.VITE_COMM_SVC_URL);
    setSocket(clientSocket);
    clientSocket?.emit(CHAT_NEW, {
      roomId: zustandRoomId,
      username: zustandUsername,
    });

    return () => {
      clientSocket.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    socket?.emit(CHAT_MESSAGE, {
      roomId: zustandRoomId,
      username: zustandUsername,
      text,
    });
  };

  const joinedChatHandler = (username: string) => {
    setItems([
      ...chatItems,
      { username, text: `${username} joined the chat`, type: "notice" },
    ]);
  };

  const chatMessageHandler = (message: { username: string; text: string }) => {
    setItems([...chatItems, { ...message, type: "message" }]);
  };

  const onType = (typing: boolean) => {
    socket?.emit(CHAT_TYPING, { roomId: zustandRoomId, typing });
  };

  const chatTypingHandler = (typing: boolean) => {
    setIsTyping(typing);
  };

  socket?.on(CHAT_JOINED, joinedChatHandler);
  socket?.on(CHAT_MESSAGE, chatMessageHandler);
  socket?.on(CHAT_TYPING, chatTypingHandler);

  return (
    <Flex direction="column" justifyContent="flex-end" flex={1}>
      <Box
        display="flex"
        sx={{ flexDirection: "column", gap: "2px", py: "5px" }}
      >
        {chatItems.map((i) => (
          <ChatItem
            text={i.text}
            belongsToUser={i.username === zustandUsername}
            type={i.type}
          />
        ))}
        {isTyping && <ChatItem belongsToUser={false} type={"typing"} />}
      </Box>
      <InputBox onSend={sendMessage} onType={onType} />
    </Flex>
  );
};

export default Chat;
