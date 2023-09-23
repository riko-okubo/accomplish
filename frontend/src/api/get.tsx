import { accessPointURL } from "./accessPoint";

const getUser = async (token: string) => {
  const response = await fetch(`${accessPointURL}check_token/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const responseData = await response.json();
  if (response.status === 201) {
    console.log("GET成功:", responseData);
  }
  return responseData;
};
export { getUser };

const getFolders = async (token: string) => {
  const response = await fetch(`${accessPointURL}folders/?type=received`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const responseData = await response.json();
  return responseData;
};
export { getFolders };

const getTasks = async (folderId: number, token: string) => {
  const response = await fetch(`${accessPointURL}task/?folder_id=${folderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const responseData = await response.json();
  return responseData;
};
export { getTasks };

const getTask = async (taskId: string, token: string) => {
  const response = await fetch(`${accessPointURL}task/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  const responseData = await response.json();
  return responseData;
};
export { getTask };
