import { Box, Text, Textarea } from "@chakra-ui/react";
import { Task } from "../type/Types";
import { DoneButton } from "../component/buttons/DoneButton";
import { DoButton } from "../component/buttons/DoButton";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const NotDoneTaskPage = ({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const [value, setValue] = useState("");

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setValue(inputValue);
  };
  return (
    <Box w="360px" mx="auto" textAlign="center">
      <Text fontSize="3xl" mt="8" align={"center"} justifyContent={"center"}>
        {task.title}
      </Text>
      <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
        タスク内容
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"2"}>
        <Text color="gray.500" textAlign={"left"}>
          {task.content}
        </Text>
      </Box>
      <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
        メモ
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"2"}>
        <Text color="gray.500" textAlign={"left"}>
          {task.memo}
        </Text>
      </Box>

      <Box>
        {task.status === "doing" ? (
          <Text color={"orange"}>取り組み中</Text>
        ) : task.status === "done" ? (
          <Text color={"blue.400"}>完了</Text>
        ) : (
          <Text color={"gray.500"}>未着手</Text>
        )}
      </Box>
    </Box>
  );
};

export { NotDoneTaskPage };
