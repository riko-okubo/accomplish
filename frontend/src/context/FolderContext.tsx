import { ReactNode, createContext, useState } from "react";
import { Folders } from "../type/Types";

const FolderContext = createContext<{
  activeFolderId: number | null;
  setActiveFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
}>({
  activeFolderId: null,
  setActiveFolderId: () => null,
  folders: [],
  setFolders: () => null,
});

const FolderContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null);
  const [folders, setFolders] = useState<Folders>([]);

  return (
    <FolderContext.Provider
      value={{
        activeFolderId,
        setActiveFolderId,
        folders,
        setFolders,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export { FolderContextProvider, FolderContext };
