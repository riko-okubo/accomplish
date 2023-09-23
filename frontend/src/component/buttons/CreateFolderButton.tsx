import {
  Button,
  Flex,
  PopoverFooter,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Popover,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { FolderContext } from "../../context/FolderContext";
import { useCookies } from "react-cookie";
import { postFolder } from "../../api/post";
import { useUser } from "../../context/UserContext";
import { useForm } from "react-hook-form";

type formInputs = {
  title: string;
  vision: string;
};

const CreateFolderButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies(["token"]);
  const { user } = useUser();
  const { folders, setFolders, setActiveFolderId } = useContext(FolderContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit((data) => {
    const createFolderContents = {
      id: folders.length + 1,
      title: data.title,
      vision: data.vision,
      tasks: [],
    };
    const postFolderContents = {
      receiver_id: user.id,
      title: data.title,
      vision: data.vision,
      status: "todo",
    };
    postFolder(cookies.token, postFolderContents);
    setFolders([...folders, createFolderContents]);
    setActiveFolderId(createFolderContents.id);
    reset();
    onClose();
  });

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover placement="right" isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          bg={"white"}
          p={4}
          _hover={{
            bg: "gray.100",
            ".rotate-icon": {
              transform: "rotate(90deg)",
              transition: "transform 0.3s",
            },
          }}
          onClick={handleButtonClick}
        >
          <Icon as={AddIcon} className="rotate-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto" right={0} marginTop="5px">
        <PopoverArrow />
        <PopoverCloseButton onClick={onClose} />
        <PopoverHeader>
          <center>フォルダの追加</center>
        </PopoverHeader>
        <form onSubmit={onSubmit}>
          <PopoverBody marginY="2">
            <FormControl>
              <FormLabel w="60vh" marginX="2" marginY="2">
                フォルダ名
              </FormLabel>
              <Input
                id="title"
                type="text"
                {...register("title", {
                  required: "必須項目です",
                  maxLength: {
                    value: 20,
                    message: "20文字以内で入力してください",
                  },
                })}
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel w="60vh" marginX="2" marginY="2">
                ビジョン
              </FormLabel>
              <Input
                id="vision"
                type="text"
                {...register("vision", {
                  required: "必須項目です",
                  maxLength: {
                    value: 20,
                    message: "20文字以内で入力してください",
                  },
                })}
              />
              {errors.vision && (
                <FormErrorMessage>{errors.vision.message}</FormErrorMessage>
              )}
            </FormControl>
          </PopoverBody>
          <PopoverFooter border="none">
            <Flex justifyContent="flex-end">
              <Button
                colorScheme="blue"
                type="submit"
                mr={3}
                isLoading={isSubmitting}
                mb="4"
              >
                追加
              </Button>
            </Flex>
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export { CreateFolderButton };
