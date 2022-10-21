import { Box, Heading, Text } from "@chakra-ui/react";

const Results = ({codeResult}: {codeResult:{ result: string, iserror: boolean}}) => {
  return (
    <Box padding={2}>
      <Heading>Results</Heading>
        <Text whiteSpace={"pre"} fontFamily='monospace' color={codeResult.iserror ? 'tomato' : undefined} >{`${codeResult.result}`}</Text>
    </Box>
  );
};

export default Results;
