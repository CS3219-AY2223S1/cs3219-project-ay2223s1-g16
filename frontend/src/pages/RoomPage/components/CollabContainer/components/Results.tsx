import { Box, Heading, Text } from "@chakra-ui/react";

const Results = ({codeResult}:any) => {
  return (
    <Box padding={2}>
      <Heading>Results</Heading>
      <Text>{codeResult}</Text>
    </Box>
  );
};

export default Results;
