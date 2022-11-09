import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

const LanguageModal = ({
  isOpen,
  onClose,
  changeLanguage,
}: {
  isOpen: boolean;
  onClose: () => void;
  changeLanguage: () => void;
}) => {
  const onSubmitHandler = () => {
    changeLanguage();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Language</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            You will lose all current changes. Are you sure you want to change
            language?
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              marginRight={2}
              colorScheme="red"
              onClick={() => onSubmitHandler()}
            >
              Change
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LanguageModal;
