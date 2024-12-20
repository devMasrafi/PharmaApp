import React, { Children } from "react";
import useAuthProtectedRedirect from "./AuthProtected";

const AuthProtectedUtils = ({children}) => {
  useAuthProtectedRedirect();

  return <>{children}</>
};

export default AuthProtectedUtils;
