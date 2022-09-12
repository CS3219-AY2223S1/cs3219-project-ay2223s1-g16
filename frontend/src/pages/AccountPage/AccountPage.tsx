import {
  Button,
  Center,
  Heading,
  VStack,
  Avatar,
  Text,
  Box,
} from "@chakra-ui/react";
import useUserStore from "~/store/userStore";

const AccountPage = () => {
  const zustandUsername = useUserStore((state) => state.username);
  const zustandLogout = useUserStore((state) => state.logout);
  return (
    <Center sx={{ height: "90vh" }}>
      <VStack>
        <Box display="flex" flexDirection="column" sx={{ mb: 2 }}>
          <Avatar
            size={"sm"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
          />
          <Text>{zustandUsername}</Text>
        </Box>
        <Button colorScheme="green" width="100%">
          Change Password
        </Button>
        <Button colorScheme="teal" width="100%" onClick={() => zustandLogout()}>
          Logout
        </Button>
        <Button colorScheme="red" width="100%">
          Delete Account
        </Button>
      </VStack>
    </Center>
  );
};

export default AccountPage;
