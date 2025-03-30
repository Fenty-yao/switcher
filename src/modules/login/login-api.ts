import { UserInfo } from "./types";

interface LoginResponse {
  code: number;
  data: UserInfo;
}

export const login = async (
  username: string,
  password: string
): Promise<UserInfo> => {
  const { data } = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then<LoginResponse>((resp) => resp.json());

  return data;
};
