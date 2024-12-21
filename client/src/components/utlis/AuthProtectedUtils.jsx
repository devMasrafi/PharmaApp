import React, { Children } from "react";
import AuthProtected from "./AuthProtected";


const AuthProtectedUtils = ({children}) => {
  AuthProtected();

  return <>{children}</>
};

export default AuthProtectedUtils;
