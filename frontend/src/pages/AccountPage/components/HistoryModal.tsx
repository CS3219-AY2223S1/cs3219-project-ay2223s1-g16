import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Badge,
  Text,
  Skeleton,
  VStack,
  ModalFooter,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import { Question } from "~/store/matchStore";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  index?: number;
  question?: Question;
  isLoading: boolean;
}

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

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  index,
  question,
  isLoading,
}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <VStack alignItems={"start"} gap="5px">
            {isLoading || !question?.title ? (
              <>
                <Skeleton height="28px" width="80%" />
                <Skeleton height="26px" width="80%" />
              </>
            ) : (
              <>
                {`${index}. ${question.title}`}
                <Badge
                  px={2}
                  py={1}
                  colorScheme={getDifficultyColorScheme(question.difficulty)}
                >
                  {question.difficulty}
                </Badge>
              </>
            )}
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} maxH="40vh" display="flex">
          {isLoading || !question?.description ? (
            <Skeleton height="24px" width="80%" />
          ) : (
            <Text
              whiteSpace="pre-wrap"
              overflowY="auto"
              flex="1 0 0"
              width="100%"
            >
              {question.description || ""}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Accordion flex="1 0 0" allowToggle width={"100%"}>
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
                {question?.topics &&
                  question.topics.map((topic: string) => (
                    <Tag key={topic} sx={{ mx: 1 }}>
                      {topic}
                    </Tag>
                  ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
