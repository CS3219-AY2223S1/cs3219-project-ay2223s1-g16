import {
  Alert,
  AlertIcon,
  AlertTitle,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Badge,
  Heading,
  Text,
  Stack,
  Skeleton,
  VStack,
  useToast,
  Tag,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import useMatchStore from "~/store/matchStore";
import useUserStore from "~/store/userStore";
import { qnSvcClient } from "~/utils/request";

const getDifficultyColorScheme = (difficulty: string) => {
  if (difficulty == "EASY") {
    return "green";
  } else if (difficulty == "MEDIUM") {
    return "orange";
  } else if (difficulty == "HARD") {
    return "red";
  } else {
    return "";
  }
};

const Question = () => {
  const toast = useToast();
  const loggedInUserId = useUserStore((state) => state.userId);
  const matchedUserId = useMatchStore((state) => state.userId);
  const qnDifficulty = useMatchStore((state) => state.difficulty);

  const fetchQuestion = async () => {
    try {
      const response = await qnSvcClient.get(
        `/questions/${qnDifficulty}/${loggedInUserId}/${matchedUserId}`
      );
      return response.data;
    } catch (err) {
      toast({
        title: "Failed to fetch question",
        status: "error",
        isClosable: true,
      });
    }
  };

  const { isLoading, data, error } = useQuery(["question"], fetchQuestion, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Failed to retrieve question</AlertTitle>
      </Alert>
    );
  } else {
    const { title, description, topics } = data;
    return (
      <VStack alignItems={"start"} sx={{ height: "100%" }}>
        <Heading>{title}</Heading>
        <Badge
          sx={{ px: 2, py: 1 }}
          colorScheme={getDifficultyColorScheme(qnDifficulty)}
        >
          {qnDifficulty}
        </Badge>
        <Text>{description}</Text>
        <Accordion allowToggle width={"100%"}>
          <AccordionItem>
            <h2>
              <AccordionButton sx={{ px: 0 }}>
                <Box flex="1" textAlign="left">
                  Related Topics
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} sx={{ px: 0 }}>
              {topics.map((topic: string) => (
                <Tag key={topic} sx={{ mx: 1 }}>
                  {topic}
                </Tag>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    );
  }
};

export default Question;
