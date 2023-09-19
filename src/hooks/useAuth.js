import { useContext } from "react";
import AuthContext from "../context.js/AuthProvider";

const useAuth  = () => {
  return useContext(AuthContext);
};

export default useAuth;