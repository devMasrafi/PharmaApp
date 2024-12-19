import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="px-[4rem] py-[2rem] ">
      <Header />
      <div className="flex h-[48rem] pt-[2rem] ">
        <Sidebar />
        <div className="mx-auto w-[85%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
