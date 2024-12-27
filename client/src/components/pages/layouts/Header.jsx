import React, { useEffect, useState } from "react";
import  logedInUser  from "../../utlis/getUser";
import { Link } from "react-router";

const Header = () => {
  const user = logedInUser();

  return (
    <main>
      <section className="border-b-2 pb-4 border-darkWood rounded-lg ">
        <div className="flex justify-between items-center tracking-wider font-semibold mx-2">
          <div className="font-RaleWayFont text-2xl ">Dashboard</div>
          <Link to="/profile" className="flex items-center">
            <div className="flex gap-x-[2rem] items-center ">
              <h2 className="font-RaleWayFont  text-lg capitalize tracking-wider font-medium   ">
                {user ? user.data.username : "Loading..."}
              </h2>
              <button className="px-2 py-1 rounded-full bg-darkWood text-white uppercase">
                o
              </button>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Header;
