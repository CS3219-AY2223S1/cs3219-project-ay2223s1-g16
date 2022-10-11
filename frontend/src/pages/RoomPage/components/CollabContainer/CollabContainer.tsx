import { Divider, Flex } from "@chakra-ui/react";

import Question from "./components/Question";
import PeerPrepCodeMirror from "./components/PeerPrepCodeMirror";
import Chat from "./components/Chat/Chat";

const CollabContainer = () => {
  return (
    <Flex direction={"row"} wrap={"wrap"} flex={1}>
      <Flex
        direction="column"
        justifyContent="space-between"
        padding={6}
        minWidth="300px"
        flex={1}
        height={"100%"}
      >
        <Question />
        <Chat />
      </Flex>
      <Divider orientation="vertical" />
      <PeerPrepCodeMirror />
    </Flex>
  );
};

export default CollabContainer;
