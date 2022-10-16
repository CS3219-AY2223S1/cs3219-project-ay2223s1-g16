import { Box, Heading, Text } from "@chakra-ui/react";

const Results = ({codeResult}: {codeResult:{ result: string, iserror: boolean}}) => {
  return (
    <Box padding={2}>
      <Heading>Results</Heading>
      {
        // Font has to be monospaced to allow error messages to be formatted properly
        // whitespace=pre preserves whitespaces
        codeResult.iserror ?
        <Text whiteSpace={"pre"} fontFamily='monospace' color='tomato' >{`${codeResult.result}`}</Text> :
        <Text whiteSpace={"pre"} fontFamily='monospace' >{`${codeResult.result}`}</Text>
      }
    </Box>
  );
};

export default Results;
