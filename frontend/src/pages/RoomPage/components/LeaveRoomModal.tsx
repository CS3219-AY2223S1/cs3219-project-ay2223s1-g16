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

const LeaveRoomModal = ({
  isOpen,
  onClose,
  leaveRoom,
}: {
  isOpen: boolean;
  onClose: () => void;
  leaveRoom: () => void;
}) => {
  const onSubmitHandler = async () => {
    leaveRoom();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Are you sure you want to leave the room?</ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              marginRight={2}
              colorScheme="red"
              onClick={() => onSubmitHandler()}
            >
              Leave
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LeaveRoomModal;
