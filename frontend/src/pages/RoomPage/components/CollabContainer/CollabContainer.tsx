import { Box, Divider, Flex } from "@chakra-ui/react";

import Question from "./components/Question";
import PeerPrepCodeMirror from "./components/PeerPrepCodeMirror";

const CollabContainer = () => {
  return (
    <Flex direction={"row"} wrap={"wrap"} flex={1}>
      <Box padding={6} minWidth="300px" flex={1} height={"100%"}>
        <Question />
      </Box>
      <Divider orientation="vertical" />
      <PeerPrepCodeMirror />
    </Flex>
  );
};

export default CollabContainer;
