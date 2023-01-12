import { useContext } from "react";
import { UserContext } from "../contexts/user/userContext";

export const useUserContext = () => {
  return useContext(UserContext);
};
