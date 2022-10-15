import {
  Button,
  Center,
  Heading,
  HStack,
  VStack,
  Avatar,
  Text,
  Box,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import useUserStore from "~/store/userStore";
import { userSvcClient } from "~/utils/request";
import ChangePasswordModal from "./components/ChangePasswordModal";
import DeleteAccountModal from "./components/DeleteAccountModal";
import HistoryList from "./components/HistoryList";

const AccountPage = () => {
  const toast = useToast();
  const zustandUsername = useUserStore((state) => state.username);
  const zustandLogout = useUserStore((state) => state.logout);
  const {
    isOpen: pwIsOpen,
    onOpen: pwOnOpen,
    onClose: pwOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const fetchHistory = async () => {
    try {
      const response = await userSvcClient.get(`/history/${zustandUsername}`);
      return response.data;
    } catch (err) {
      toast({
        title: "Failed to fetch history",
        status: "error",
        isClosable: true,
      });
    }
  };

  const { isLoading, data } = useQuery(["userHistory"], fetchHistory);

  return (
    <Center sx={{ height: "90vh" }}>
      <HStack sx={{ justifyContent: "space-evenly", width: "40vw" }}>
        <VStack>
          <Box
            display="flex"
            flexDirection="column"
            sx={{ mb: 2, alignItems: "center" }}
          >
            <Avatar
              size={"sm"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
            <Text>@{zustandUsername}</Text>
          </Box>
          <Button colorScheme="green" width="100%" onClick={pwOnOpen}>
            Change Password
          </Button>
          <Button
            colorScheme="teal"
            width="100%"
            onClick={() => zustandLogout()}
          >
            Logout
          </Button>
          <Button colorScheme="red" width="100%" onClick={deleteOnOpen}>
            Delete Account
          </Button>
          <ChangePasswordModal isOpen={pwIsOpen} onClose={pwOnClose} />
          <DeleteAccountModal isOpen={deleteIsOpen} onClose={deleteOnClose} />
        </VStack>
        <Box>
          <Heading as="h3" size="lg" sx={{ mb: 5 }}>
            History
          </Heading>
          <HistoryList data={data} isLoading={isLoading} />
        </Box>
      </HStack>
    </Center>
  );
};

export default AccountPage;
