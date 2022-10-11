import React, { memo } from "react";
import { Tag, Text } from "@chakra-ui/react";

interface BubbleProps {
  text?: string;
  belongsToUser: boolean;
  type: string;
}

const ChatItem: React.FC<BubbleProps> = ({ text, belongsToUser, type }) => {
  switch (type) {
    case "message":
      return (
        <Tag
          colorScheme={belongsToUser ? "green" : "gray"}
          size="lg"
          sx={{
            alignSelf: belongsToUser ? "flex-end" : "flex-start",
          }}
        >
          {text}
        </Tag>
      );
    case "typing":
      return (
        <Tag
          colorScheme="gray"
          size="lg"
          sx={{ opacity: 0.3, alignSelf: "flex-start" }}
        >
          ...
        </Tag>
      );
    default:
      return (
        <Text sx={{ alignSelf: "center", fontSize: "0.8rem" }}>{text}</Text>
      );
  }
};

export default memo(ChatItem);
