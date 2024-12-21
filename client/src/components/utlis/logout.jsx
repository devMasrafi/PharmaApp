import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove('role')
    localStorage.clear();

    navigate("/login");
  };

  return logout;
};

export default logout;
