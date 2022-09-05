import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import programmingSvg from "~/assets/undraw_programming.svg";
import { Login } from "./components/Login";

const LoginPage = () => {
  return (
    <Flex
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"10vw"}
      wrap={"wrap"}
      sx={{ height: "100vh" }}
    >
      <Login />
      <Box padding={2}>
        <img src={programmingSvg} alt="logo" />
        <Heading>PeerPrep</Heading>
        <Text>
          Ace your coding interviews through practice via our interactive
          platform
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
