import React from "react";
import { NavLink } from "react-router";
import Cookies from "js-cookie";
import uselogout from "../../components/utlis/logout";


const Sidebar = () => {
  const pageArr = [
    {
      link: "/",
      pageName: "Overview",
    },
    {
      link: "/medicine",
      pageName: "medicine",
    },
    {
      link: "/updateprice",
      pageName: "Update Price",
    },
    {
      link: "/illnesses",
      pageName: "illnesses",
    },
    
    {
      link: "/quantity",
      pageName: "quantity",
    },
  ];

  const userRole = Cookies.get("role");
  // console.log(userRole)
  const logout = uselogout()

  return (
    <main className="border-r-2 border-rounded border-darkWood">
      <section className="flex flex-col h-full justify-between px-[2rem] ">
        <div>
          {pageArr.map((items, index) => {
            return (
              <ul key={index}>
                <li className="py-[1rem] text-lg capitalize font-interFont font-light relative ">
                  <NavLink
                    to={items.link}
                    className="hover:border-b-[2px] transition-all duration-150  ease-in-out pb-1 border-darkWood "
                  >
                    {items.pageName}
                  </NavLink>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="flex  flex-col text-white  ">
          {/* role check if admin show add staff other no */}
          {userRole === "admin" && (
            <button
              className={`px-[2rem] py-[0.5rem] bg-darkWood mb-2 rounded-md capitalize  font-interFont tracking-wider`}
            >
              <NavLink to={"/addstaff"}>add staff</NavLink>
            </button>
          )}

          <button
            className={`px-[2rem] py-[0.5rem] bg-darkWood mb-2 rounded-md capitalize  font-interFont tracking-wider`}
          onClick={logout}
          >
            logout
          </button>
        </div>
      </section>
    </main>
  );
};

export default Sidebar;
