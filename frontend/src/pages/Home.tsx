import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FolderContextProvider } from "../context/FolderContext";

import { FolderList } from "../component/FolderList";
import { TaskContextProvider } from "../context/TaskContext";
import { getUser } from "../api/get";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie] = useCookies(["token", "user_id", "user_name"]);

  useEffect(() => {
    getUser(cookies.token).then((res) => {
      setCookie("user_id", res.id);
      setCookie("user_name", res.username);
    });
  }, [cookies.token, setCookie]);

  return (
    <HStack>
      <VStack w={"100%"} h={"100%"} marginLeft={"80px"}>
        <Box w="auto" h={"10vh"} marginTop={8} paddingY={2} fontSize="3xl">
          Hello! {cookies.user_name}
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
