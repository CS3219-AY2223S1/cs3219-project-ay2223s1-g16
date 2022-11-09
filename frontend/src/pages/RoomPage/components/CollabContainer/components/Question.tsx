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
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import useMatchStore from "~/store/matchStore";

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
  const question = useMatchStore((state) => state.question);

  if (question === null) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Failed to retrieve question</AlertTitle>
      </Alert>
    );
  } else {
    const { title, description, topics, difficulty } = question;
    return (
      <VStack alignItems={"start"} sx={{ height: "100%" }}>
        <Heading>{title}</Heading>
        <Badge
          sx={{ px: 2, py: 1 }}
          colorScheme={getDifficultyColorScheme(difficulty)}
        >
          {difficulty}
        </Badge>
        <Text whiteSpace="pre-wrap" overflowY="auto" flex="1 0 0" width="100%">
          {description}
        </Text>
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
