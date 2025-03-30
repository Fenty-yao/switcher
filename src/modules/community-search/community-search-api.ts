export const selectCommunity = async (name: string, userId: string) => {
  const { code } = await fetch("http://localhost:8080/api/select-community", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      userId,
    }),
  }).then((resp) => resp.json());

  return code === 200;
};
