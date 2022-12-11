import axios from "axios";

export const generateAvatar = async (name: string, random?: boolean) => {
  console.log(
    `https://api.multiavatar.com/${name}?apikey=${process.env.MULTI_AVATAR_API_KEY}`
  );
  try {
    const res = await axios.get(
      `https://api.multiavatar.com/${name}?apikey=${process.env.MULTI_AVATAR_API_KEY}`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    return res.data.split("</svg>")[0] + "</svg>";
  } catch (error) {
    console.log(error);
    return null;
  }
};
