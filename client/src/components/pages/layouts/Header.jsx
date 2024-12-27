import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";


const Header = () => {
  const baseUrl = "http://localhost:8000/api/v1/users";
  const [logedInUser, setLogedInUser] = useState(null);

  const token = Cookies.get("token");


  const getUser = async () => {
    try {
      const getData = await fetch(`${baseUrl}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!getData.ok) {
        console.log("failed to fetch user");
      }

      const response = await getData.json();
      // console.log(response);
      setLogedInUser(response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // if (logedInUser) {
  //   console.log(logedInUser.data);
  // }

  return (
    <main>
      <section className="border-b-2 pb-4 border-darkWood rounded-lg ">
        <div className="flex justify-between items-center tracking-wider font-semibold mx-2">
          <div className="font-RaleWayFont text-2xl ">Dashboard</div>
          <div className="flex gap-x-[2rem] items-center ">
            <h2 className="font-interFont text-lg capitalize tracking-wider font-light   ">
              {
                logedInUser ? logedInUser.data.username : "Loading..."
              }
            </h2>
            <button className="px-2 py-1 rounded-full bg-darkWood text-white uppercase">
              o
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Header;
