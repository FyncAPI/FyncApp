import endpoints from "constants/endpoints";

export const getUserFromFync = async (session: string) => {
  const response = await fetch(endpoints.fync.me.url, {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });

  const data = await response.json();

  console.log(data);
  return data;
};
