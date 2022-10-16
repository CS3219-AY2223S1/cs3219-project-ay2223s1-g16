import { Box, Heading, Text } from "@chakra-ui/react";

const Results = ({codeResult}: {codeResult:string}) => {
  return (
    <Box padding={2}>
      <Heading>Results</Heading>
      {/* The following is to ensure that the newlines in the results are display properly */}
      <Text>{codeResult.split('\n').map(str => <p>{str}</p>)}</Text> 
    </Box>
  );
};

export default Results;
