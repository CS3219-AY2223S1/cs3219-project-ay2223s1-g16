import { Heading } from "@chakra-ui/react";

import useMatchStore from "~/store/matchStore";

const CodePage = () => {
  const matchState = useMatchStore((state) => state);
  const { userId, roomId } = matchState;

  return <Heading>{`Coding in room ${roomId} with ${userId}`}</Heading>;
};

export default CodePage;
