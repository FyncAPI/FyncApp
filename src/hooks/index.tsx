import { useContext } from "react";
import { UserContext } from "../contexts/user/context";

export const useUserContext = () => {
  return useContext(UserContext);
};
