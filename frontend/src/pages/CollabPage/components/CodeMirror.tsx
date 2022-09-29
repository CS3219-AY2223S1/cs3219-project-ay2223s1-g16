import CodeMirror from "@uiw/react-codemirror";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { python } from "@codemirror/lang-python";
import { useCallback } from "react";
import { sublime } from "@uiw/codemirror-theme-sublime";
import Results from "./Results";

const PeerPrepCodeMirror = () => {
  const onChange = useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);

  return (
    <Flex
      direction={"column"}
      padding={2}
      minWidth="300px"
      width="50vw"
      //   height="100vh"
    >
      <CodeMirror
        basicSetup={true}
        value="console.log('hello world!');"
        // height="70vh"
        theme={sublime}
        extensions={[python()]}
        onChange={onChange}
      />
      <Results />
    </Flex>
  );
};

export default PeerPrepCodeMirror;
