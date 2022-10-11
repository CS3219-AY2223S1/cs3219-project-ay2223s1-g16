import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface InputBoxProps {
  onSend: (text: string) => void;
  onType: (typing: boolean) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSend, onType }) => {
  const [message, setMessage] = useState<string>("");

  const handleEnterKeypress = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  const handleInputChange = (text: string) => {
    if (
      (message.length === 0 && text.length > 0) ||
      (text.length === 0 && message.length > 0)
    ) {
      onType(text !== "");
    }
    setMessage(text);
  };

  const handleSend = () => {
    onSend(message);
    setMessage("");
    onType(false);
  };

  return (
    <Flex gap="5px" onKeyDown={handleEnterKeypress}>
      <Input
        value={message}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Send a message"
      />
      <Button
        type="submit"
        sx={{ px: "1rem" }}
        onClick={handleSend}
        colorScheme="facebook"
        isDisabled={message === ""}
      >
        Send
      </Button>
    </Flex>
  );
};

export default InputBox;
