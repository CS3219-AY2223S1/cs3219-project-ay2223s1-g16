import { Box, Divider, Flex } from "@chakra-ui/react";

import Question from "./components/Question";
import PeerPrepCodeMirror from "./components/PeerPrepCodeMirror";
import Chat from "./components/Chat/Chat";

const CollabContainer = () => {
  return (
    <Flex direction={"row"} wrap={"wrap"} flex={1}>
      <Flex
        direction="column"
        justifyContent="space-between"
        minWidth="300px"
        flex={1}
        height="100%"
      >
        <Box height="50%" p={6} pb={0}>
          <Question />
        </Box>
        <Divider />
        <Box height="50%" p={6} pt={0}>
          <Chat />
        </Box>
      </Flex>
      <Divider orientation="vertical" />
      <PeerPrepCodeMirror />
    </Flex>
  );
};

export default CollabContainer;
