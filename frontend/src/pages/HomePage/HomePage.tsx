import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import pairProgrammingSvg from "~/assets/undraw_pair_programming.svg";
import NavBar from "./components/NavBar";

const HomePage = () => {
    return (
        <Box>
            <NavBar />
            <Flex
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10vw"}
                wrap={"wrap"}
                sx={{ height: "100vh" }}
                backgroundImage={pairProgrammingSvg}
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="contain"
            >
                <Box padding={2}>
                    <Heading>PeerPrep</Heading>
                    <Text>
                        Ace your coding interviews through practice via our interactive
                        platform
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default HomePage;