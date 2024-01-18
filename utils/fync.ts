import endpoints from "constants/endpoints";

export const getUserFromFync = async (session: string) => {
  console.log(session);
  const response = await fetch(endpoints.fync.me.url, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const data = await response.json();

  console.log(data, "data");
  return data;
};
