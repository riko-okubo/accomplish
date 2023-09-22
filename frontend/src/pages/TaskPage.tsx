import { Box, Text } from "@chakra-ui/react";
import { Task } from "../type/Types";

const TaskPage = ({ task }: { task: Task }) => {
  return (
    <Box w="360px" mx="auto" textAlign="center">
      <Text fontSize="3xl" mt="8" align={"center"} justifyContent={"center"}>
        {task.title}
      </Text>
      <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
        タスク内容
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"3"}>
        <Text color="blackAlpha.800" textAlign={"left"}>
          {task.content}
        </Text>
      </Box>
      <Text color="gray.500" mb="1" mt="4" textAlign={"left"}>
        メモ
      </Text>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={"2"}
        minH={"3rem"}
      >
        <Text color="gray.500" textAlign={"left"}>
          {task.memo}
        </Text>
      </Box>
      <Box p={4}>
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
    </Box>
  );
};

export { TaskPage };
