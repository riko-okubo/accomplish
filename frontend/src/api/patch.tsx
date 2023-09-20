import { accessPointURL } from "./accessPoint";

const patchStatus = async (taskId: string, token: string) => {
  const response = await fetch(`${accessPointURL}task/${taskId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Token ${token}`,
    },
    body: `status=doing`,
  });
  if (response.status === 200) {
    console.log("status PATCH成功", response);
  } else {
    console.log("status PATCH失敗", response);
  }
};
export { patchStatus };

const patchMemo = async (taskId: string, token: string, memo: string) => {
  const response = await fetch(`${accessPointURL}task/${taskId}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Token ${token}`,
    },
    body: `memo=${memo}`,
  });
  if (response.status === 200) {
    console.log("memo PATCH成功", response);
  } else {
    console.log("memo PATCH失敗", response);
  }
};
export { patchMemo };

//フォルダ名、タスク名の変更ものちに実装
