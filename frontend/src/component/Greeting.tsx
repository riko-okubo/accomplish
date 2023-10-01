import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHippo,
  faOtter,
  faCat,
  faDog,
  faHorse,
  faFish,
  faFrog,
  faDragon,
  faCrow,
  faShrimp,
} from "@fortawesome/free-solid-svg-icons";
import { Box, HStack, Text } from "@chakra-ui/react";

const greetings = [
  "Hello !",
  "Bonjour !",
  "Ciao !",
  "こんにちは !",
  "안녕하세요 !",
  "你好 !",
  "Здравствуйте !",
  "Aloha !",
  "Hola !",
];

const Greeting = () => {
  const random = Math.floor(Math.random() * 8) + 1;
  return (
    <div>
      <h1>{greetings[random]}</h1>
    </div>
  );
};

export { Greeting };

const aFewWords = [
  "やっていきますか",
  "調子はどう？",
  "ワン！",
  "今日何曜日だっけ？",
  "週末なにするのー？",
  "にゃー",
  "黄色といえば！？",
  "緑色といえば！？",
  "今日何食べる？",
  "今日何飲む？",
];

const animals = [
  faHippo,
  faOtter,
  faCat,
  faDog,
  faHorse,
  faFish,
  faFrog,
  faDragon,
  faCrow,
  faShrimp,
];

const Word = () => {
  const random = Math.floor(Math.random() * 9) + 1;
  return (
    <HStack m={0} gap={0}>
      <Box paddingRight={4}>
        <FontAwesomeIcon icon={animals[random]} size="xl" color="#4A5568" />
      </Box>
      <Text color="gray.300">＜</Text>
      <Box
        p={2}
        paddingLeft={3}
        border="1px solid #CBD5E0"
        borderLeft="none"
        rounded="2xl"
      >
        <Text color="gray.600">{aFewWords[random]}</Text>
      </Box>
    </HStack>
  );
};
export { Word };
