import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface InputBoxProps {
  onSend: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>("");

  const handleEnterKeypress = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    onSend(message);
    setMessage("");
  };

  return (
    <Flex gap="5px" onKeyDown={handleEnterKeypress}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Send a message"
      />
      <Button type="submit" sx={{ px: "1rem" }} onClick={handleSend}>
        Send
      </Button>
    </Flex>
  );
};

export default InputBox;
