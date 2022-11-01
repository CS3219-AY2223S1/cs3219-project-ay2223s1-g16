import { Flex, Heading, Text, Spinner } from "@chakra-ui/react";

const Results = ({
  codeResult,
  isRunning,
}: {
  codeResult: { result: string; iserror: boolean };
  isRunning: boolean;
}) => {
  return (
    <Flex direction="column" padding={2} height="50%">
      <Heading mb="2px">Results</Heading>
	  { isRunning ?
	  <Spinner size='xl' />
	  :
      <Text
        whiteSpace="pre-wrap"
        fontFamily="monospace"
        color={codeResult.iserror ? "tomato" : undefined}
        flex="1 0 0"
        overflowY="auto"
      >
        {codeResult.result}
      </Text>
	  }
    </Flex>
  );
};

export default Results;
