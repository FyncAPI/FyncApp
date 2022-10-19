import { useContext } from "react";
import { UserContext } from "../contexts/user";

export const useUserContext = () => {
  return useContext(UserContext);
};
