import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { getTask } from "../api/get";
import { Task } from "../type/Types";
import { DoneButton } from "../component/buttons/DoneButton";
import { DoButton } from "../component/buttons/DoButton";

const TaskDetailPage = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["token"]);
  const [update, setUpdate] = useState(false);
  const [task, setTask] = useState<Task>({
    id: 0,
    title: "",
    content: "",
    memo: "",
    status: "todo",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined && cookies.token !== undefined) {
      getTask(id, cookies.token).then((res) => {
        setTask(res);
      });
    }
  }, [id, cookies.token, update]);

  return (
    <>
      <Box p="4" ml="8">
        <Text
          fontSize="xl"
          as="b"
          color={
            task.status === "done"
              ? "teal.400"
              : task.status === "doing"
              ? "orange.400"
              : "gray.400"
          }
        >
          {task.status === "done"
            ? "Done !"
            : task.status === "doing"
            ? "In progress"
            : "todo"}
        </Text>
      </Box>
      <Box minH="95vh" mx="auto" textAlign="center">
        <Text fontSize="3xl" mt="8" p="6" align="center">
          {task.title}
        </Text>
        <Text color="blackAlpha.700" p="4">
          {task.content}
        </Text>
        <Box p={4} w="60%" m="auto">
          <Text color="gray.500" textAlign="left" ml="2">
            メモ
          </Text>
          <Box
            bg="white"
            borderWidth="1px"
            borderRadius="lg"
            padding="2"
            minH="3rem"
          >
            <Text color="gray.500" textAlign="left">
              {task.memo}
            </Text>
          </Box>
        </Box>

        <Box p="4">
          {task.status === "doing" ? (
            <DoneButton id={id} update={update} setUpdate={setUpdate} />
          ) : task.status === "todo" ? (
            <DoButton id={id} update={update} setUpdate={setUpdate} />
          ) : (
            <></>
          )}
        </Box>
        <Box mt="8">
          <Button
            onClick={() => navigate(-1)}
            textColor="gray.400"
            bg=""
            _hover={{ opacity: 0.8 }}
          >
            ← back
          </Button>
        </Box>
      </Box>
    </>
  );
};
export { TaskDetailPage };
