import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useUser } from "../context/UserContext";

const Logout = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onClickLogout = () => {
    setUser({
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
    navigate("/login");
  };
  return <Button onClick={onClickLogout}>ログアウト</Button>;
};

export { Logout };
