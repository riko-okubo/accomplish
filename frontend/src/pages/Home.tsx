import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, Spacer, VStack } from "@chakra-ui/react";
import { FolderContextProvider } from "../context/FolderContext";

import { FolderList } from "../component/FolderList";
import { TaskContextProvider } from "../context/TaskContext";
import { getUser } from "../api/get";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { User } from "../type/Types";
import { Greeting, Word } from "../component/Greeting";

const Home = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(cookies.token).then((res) => {
      setUser(res);
    });
  }, [cookies.token, setCookie]);

  return (
    <HStack>
      <VStack w={"100%"} h={"100%"} marginLeft={"80px"}>
        <Box w="auto" h={"8vh"} marginTop={8} paddingY={2} fontSize="3xl">
          <HStack>
            <Greeting />
            <p>{user?.username}</p>
          </HStack>
        </Box>
        <Word />
        <Flex
          w={"80%"}
          h={"100%"}
          marginTop={6}
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
