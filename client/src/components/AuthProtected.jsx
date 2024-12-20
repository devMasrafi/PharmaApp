import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const AuthProtectedRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
};

export default AuthProtectedRedirect;
