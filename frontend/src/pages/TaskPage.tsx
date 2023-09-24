import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Task } from "../type/Types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskPage = ({ task }: { task: Task }) => {
  const { setTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setTask(task);
    navigate(`/taskdetail/${task.id}`);
  };

  return (
    <Box p={2}>
      <Box px={4} py={2}>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
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
      <Box mx="auto" textAlign="center">
        <VStack my={4}>
          <Text fontSize="3xl" align={"center"} justifyContent={"center"}>
            {task.title}
          </Text>
          <Text fontSize="xl" m="4" color="blackAlpha.600">
            {task.content}
          </Text>
        </VStack>
        <Button
          onClick={handleClick}
          bg="white"
          color="gray.300"
          _hover={{ color: "teal.200" }}
        >
          <Text pr={2}>open</Text>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </Button>
      </Box>
    </Box>
  );
};

export { TaskPage };
