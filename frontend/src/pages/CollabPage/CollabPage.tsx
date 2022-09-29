import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import CodeMirror from "./components/CodeMirror";
import Question from "./components/Question";

const CollabPage = () => {
  return (
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      //   wrap={"wrap"}
      sx={{ height: "100vh" }}
    >
      <Question />
      <CodeMirror />
    </Flex>
  );
};

export default CollabPage;
