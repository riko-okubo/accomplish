import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { User } from "../type/Types";
import { getUser } from "../api/get";
import { useCookies } from "react-cookie";

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const LoginContext = React.createContext<boolean>(false);
const UserContext = React.createContext<UserContextType>({
  user: {
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
  },
  setUser: () => null,
});
const useUser = () => {
  return useContext(UserContext);
};
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [login] = useState<boolean>(false);
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

  useEffect(() => {
    getUser(cookies.token).then((res) => {
      setUser(res);
    });
  }, [cookies.token, setCookie]);

  return (
    <LoginContext.Provider value={login}>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </LoginContext.Provider>
  );
};
export { UserProvider, useUser };
