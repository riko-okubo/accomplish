import { useAuth } from "../AuthContext";
import { Folder } from "../type/Types";
import { accessPointURL } from "./accessPoint";

const postFolder = async (postFolderContents: Folder, token: string) => {
  const response = await fetch(`${accessPointURL}folders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(postFolderContents),
  });
  if (response.status === 201) {
    console.log("Folder POST成功");
  } else {
    console.log("Folder POST失敗");
  }
};
export { postFolder };

const postTask = async (postTaskContents: any, token: string) => {
  const response = await fetch(`${accessPointURL}task/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(postTaskContents),
  });
  if (response.status === 201) {
    console.log("Task POST成功");
  } else {
    console.log("Task POST失敗");
  }
};
export { postTask };
