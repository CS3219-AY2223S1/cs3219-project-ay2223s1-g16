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
            {isLoading || !question ? (
              <>
                <Skeleton height="28px" width="80%" />
                <Skeleton height="26px" width="80%" />
              </>
            ) : (
              <>
                {`${index}. ${question?.title}`}
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
        <ModalBody pb={6}>
          {isLoading || !question ? (
            <Skeleton height="24px" width="80%" />
          ) : (
            <Text
              whiteSpace="pre-wrap"
              overflowY="auto"
              flex="1 0 0"
              width="100%"
            >
              {question.description}
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HistoryModal;
