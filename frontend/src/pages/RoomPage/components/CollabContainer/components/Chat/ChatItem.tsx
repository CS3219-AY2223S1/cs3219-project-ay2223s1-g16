import React, { memo } from "react";
import { Box, Tag, Text } from "@chakra-ui/react";

interface BubbleProps {
  text: string;
  belongsToUser: boolean;
  type: string;
}

const ChatItem: React.FC<BubbleProps> = ({ text, belongsToUser, type }) => {
  return type === "message" ? (
    <Tag
      colorScheme={belongsToUser ? "green" : "gray"}
      sx={{
        alignSelf: belongsToUser ? "flex-end" : "flex-start",
      }}
    >
      {text}
    </Tag>
  ) : (
    <Text sx={{ alignSelf: "center", fontSize: "0.8rem" }}>{text}</Text>
  );
};

export default memo(ChatItem);
