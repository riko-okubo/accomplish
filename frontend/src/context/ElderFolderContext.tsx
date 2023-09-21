import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { accessPointURL } from "../api/accessPoint";
import { Folders } from "../type/Types";

type ElderFolderContextType = {
  elderFolders: Folders;
  setElderFolders: React.Dispatch<React.SetStateAction<Folders>>;
};

const ElderFolderContext = createContext<ElderFolderContextType>({
  elderFolders: [],
  setElderFolders: () => null,
});

const ElderFolderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elderFolders, setElderFolders] = useState<Folders>([]);
  const { user, auth } = useAuth();

  const getElderFolder = async ({
    token,
    userId,
  }: {
    token: string;
    userId: number;
  }) => {
    const response = await fetch(
      `${accessPointURL}folders/?receiver_id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const responseData = await response.json();
    setElderFolders(responseData);
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      getElderFolder({ token: auth.token, userId: user.id });
    }
  }, [auth.token, user.id, elderFolders]);

  return (
    <ElderFolderContext.Provider
      value={{
        elderFolders,
        setElderFolders,
      }}
    >
      {children}
    </ElderFolderContext.Provider>
  );
};

export { ElderFolderContext, ElderFolderContextProvider };
