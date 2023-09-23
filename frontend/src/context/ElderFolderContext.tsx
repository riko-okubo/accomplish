import { createContext, useState, useEffect } from "react";
import { accessPointURL } from "../api/accessPoint";
import { Folders } from "../type/Types";
import { useUser } from "./UserContext";
import { useCookies } from "react-cookie";

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
  const { user } = useUser();
  const [cookies] = useCookies(["token"]);

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
    if (cookies.token !== undefined) {
      getElderFolder({ token: cookies.token, userId: user.id });
    }
  }, [cookies.token, user.id, elderFolders]);

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
