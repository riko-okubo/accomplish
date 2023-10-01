import { Box, Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <Box textAlign="center" mt="8">
      <Box w="40%" m="auto">
        <img
          alt="img"
          src="https://uploads-ssl.webflow.com/603c87adb15be3cb0b3ed9b5/6099119905dc8225f36ebb25_69.png"
        />
      </Box>
      <Button
        bg="white"
        color="teal.400"
        border="1px solid"
        borderColor="teal.400"
        fontSize="xl"
        fontFamily="inherit"
        _hover={{ bg: "teal.400", color: "white" }}
        onClick={handleClick}
      >
        Let's start !
      </Button>
    </Box>
  );
};
export { Welcome };
