import { Flex } from "@chakra-ui/react";

import Question from "./components/Question";
import PeerPrepCodeMirror from "./components/PeerPrepCodeMirror";

const CollabContainer = () => {
  return (
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      wrap={"wrap"}
      flex={1}
    >
      <Question />
      <PeerPrepCodeMirror />
    </Flex>
  );
};

export default CollabContainer;
