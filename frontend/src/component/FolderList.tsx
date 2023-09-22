import { useContext } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { CreateFolderButton } from "./buttons/CreateFolderButton";
import { Folder, Folders } from "../type/Types";
import { FolderContext } from "../context/FolderContext";
import { useAuth } from "../context/AuthContext";

type Props = {
  activeFolderId: number | null;
  setActiveFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
};

const FolderList = () => {
  const { activeFolderId, setActiveFolderId, folders }: Props =
    useContext(FolderContext);

  const handleFolderClick = (folder: Folder) => {
    console.log(folder);
    setActiveFolderId(folder.id);
  };

  return (
    <Flex direction="column" bg="white" w={120} roundedLeft={"md"}>
      {folders.length === 0 && (
        <Box paddingTop={4} textAlign={"center"}>
          <p>フォルダーがありません</p>
        </Box>
      )}
      {folders.map((folder) => (
        <Button
          rounded="none"
          key={folder.title}
          onClick={() => handleFolderClick(folder)}
          bg={activeFolderId === folder.id ? "teal.400" : "white"}
          textColor={activeFolderId === folder.id ? "white" : "black"}
          size="lg"
        >
          {folder.title}
        </Button>
      ))}

      <CreateFolderButton />
    </Flex>
  );
};

export { FolderList };
