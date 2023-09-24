import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { patchStatus } from "../../api/patch";

type Props = {
  id: string | undefined;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoButton = ({ id, update, setUpdate }: Props) => {
  const [cookies] = useCookies(["token"]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    if (id !== undefined) {
      patchStatus(id, cookies.token, "done").then((res) => {
        toast({
          title: "ステータスを変更しました",
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setUpdate(!update);
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg="white"
        border={"1px solid #B1E5DC"}
        textColor="teal.400"
        _hover={{ opacity: 0.8 }}
      >
        In Progress
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody textAlign="center">
            <Text p="4">このタスクを始めますか？</Text>
            <Box>
              <Button
                onClick={onClose}
                textColor="gray.500"
                bg="gray.100"
                m="2"
              >
                No ×
              </Button>
              <Button
                onClick={handleClick}
                textColor="white"
                bg="teal.400"
                m="2"
              >
                YES !
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { DoButton };
