import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FolderContextProvider } from "../context/FolderContext";

import { FolderList } from "../component/FolderList";
import { TaskContextProvider } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { getUser } from "../api/get";
import { User } from "../type/Types";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    is_staff: false,
    is_superuser: false,
    date_joined: "",
    last_login: "",
    company_id: 0,
    position_id: 0,
    count_emotions: 0,
    count_comment: 0,
  });
  const { auth } = useAuth();

  useEffect(() => {
    getUser(auth.token).then((res) => {
      console.log("user:", res);
      setUser(res);
    });
  }, [auth.token]);

  return (
    <HStack>
      <VStack w={"100%"} h={"100%"} marginLeft={"80px"}>
        <Box w="auto" h={"10vh"} marginTop={8} paddingY={2} fontSize="3xl">
          Hello! {user.username}
        </Box>
        <Flex
          w={"80%"}
          h={"100%"}
          marginTop={8}
          border={"1px solid"}
          borderColor={"gray.200"}
          rounded={"md"}
        >
          <FolderContextProvider>
            <TaskContextProvider>
              <FolderList />
              <TaskList />
            </TaskContextProvider>
          </FolderContextProvider>
        </Flex>
      </VStack>
    </HStack>
  );
};

export { Home };
