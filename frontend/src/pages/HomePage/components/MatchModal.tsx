import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Button,
} from "@chakra-ui/react";

const MatchModal = ({
  isOpen,
  closeModal,
  difficulty,
}: {
  isOpen: boolean;
  closeModal: () => void;
  difficulty: string;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Matching on ${difficulty}`}</ModalHeader>
        <ModalBody>
          <Text>Matching</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={closeModal}>
            Cancel Matching
          </Button>
        </ModalFooter>
      </ModalContent>
      ;
    </Modal>
  );
};

export default MatchModal;
