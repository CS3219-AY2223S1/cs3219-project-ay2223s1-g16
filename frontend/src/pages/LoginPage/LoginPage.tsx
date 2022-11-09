import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

import useUserStore from "~/store/userStore";
import { Login } from "./components/Login";
import programmingSvg from "~/assets/undraw_programming.svg";

const LoginPage = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

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
