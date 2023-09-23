import {
  Flex,
  VStack,
  Text,
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { FolderContext } from "../context/FolderContext";
import { TaskContext } from "../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { CreateTaskButton } from "./buttons/CreateTaskButton";
import { accessPointURL } from "../api/accessPoint";
import { TaskPage } from "../pages/TaskPage";
import { Task } from "../type/Types";
import { useCookies } from "react-cookie";

const TaskList = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const { folders, activeFolderId } = useContext(FolderContext);
  const { tasks, setTasks } = useContext(TaskContext);

  const getFolderIdTasks = async (token: string, folderId: number) => {
    const response = await fetch(
      `${accessPointURL}task/?folder_id=${folderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      setTasks(responseData);
    } else {
      console.log("GET失敗");
    }
  };
  const leastDestructiveRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<Task | null>(null);
  const onOpen = (task: Task) => {
    setSelectedItem(task);
  };
  const onClose = () => {
    setSelectedItem(null);
    if (cookies.token !== undefined && activeFolderId !== null) {
      getFolderIdTasks(cookies.token, activeFolderId!);
    } else {
      // console.log("cookies.tokenがundefinedです");
    }
  };

  useEffect(() => {
    if (cookies.token !== undefined && activeFolderId !== null) {
      getFolderIdTasks(cookies.token, activeFolderId!);
    } else {
      // console.log("TaskList : cookies.tokenがundefinedです");
    }
  }, [cookies.token, activeFolderId]);
  return (
    <Box bg="#F8F8F8" w="100%" minH={"70vh"} paddingY={6} roundedRight={"md"}>
      {folders.map((folder) => (
        <Box>
          {activeFolderId === folder.id && (
            <Box textAlign={"center"}>
              <Text fontSize="3xl" p={4}>
                {folder.vision}
              </Text>
              <VStack justifyContent="center" p={4}>
                {tasks.length === 0 && (
                  <Box>
                    <Text fontSize="2xl">タスクがありません</Text>
                  </Box>
                )}
                {tasks.map((task) => (
                  <Box
                    as="button"
                    key={task.id}
                    rounded="lg"
                    border="1px solid gray.300"
                    w={"70%"}
                    h={"3rem"}
                    paddingX={6}
                    m={2}
                    bg={
                      task.status === "todo"
                        ? "white"
                        : task.status === "doing"
                        ? "yellow.200"
                        : "teal.200"
                    }
                    _hover={
                      task.status === "todo"
                        ? { bg: "gray.300" }
                        : { opacity: 0.8 }
                    }
                    onClick={() => onOpen(task)}
                  >
                    <AlertDialog
                      isOpen={task === selectedItem}
                      onClose={onClose}
                      leastDestructiveRef={leastDestructiveRef}
                      autoFocus={false}
                      isCentered
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <ModalCloseButton />

                          <TaskPage task={task} />

                          <VStack
                            marginTop={4}
                            justifyContent={"center"}
                            alignItems={"center"}
                            textAlign={"center"}
                          ></VStack>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>

                    <Flex justifyContent={"space-between"}>
                      <FontAwesomeIcon
                        size="xl"
                        icon={
                          task.status === "doing"
                            ? faPersonRunning
                            : faCircleCheck
                        }
                        style={{
                          color:
                            task.status === "doing"
                              ? "#f7a072"
                              : task.status === "todo"
                              ? "#BDBDBD"
                              : "#0fa3b1",
                        }}
                        shake={task.status === "doing"}
                      />
                      <Center w={"100%"}>
                        <Text
                          key={task.id}
                          marginRight={6}
                          fontSize={"gl"}
                          color={"blackAlpha.800"}
                        >
                          {task.title}
                        </Text>
                      </Center>
                    </Flex>
                  </Box>
                ))}
                <Box paddingTop={6} textAlign={"center"}>
                  <CreateTaskButton activeFolderId={activeFolderId} />
                </Box>
              </VStack>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export { TaskList };
