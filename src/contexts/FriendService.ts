import axios from "axios";

export const generateAvatar = async (name: string, random?: boolean) => {
  console.log(
    `https://api.multiavatar.com/${
      name + (random ? Math.random().toString : "")
    }?apikey=${process.env.MULTI_AVATAR_API_KEY}`
  );
  return axios.get(
    `https://api.multiavatar.com/${
      name + (random && Math.random().toString)
    }?apikey=${process.env.MULTI_AVATAR_API_KEY}`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
};
