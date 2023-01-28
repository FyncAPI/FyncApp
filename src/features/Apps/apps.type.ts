import { Friend } from "../../contexts/user/user.types";

export type App = {
  friends: Friend[];
  _id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  userCount: number;
};
