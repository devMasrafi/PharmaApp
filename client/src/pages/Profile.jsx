import React from "react";
import getUser from "../components/utlis/getUser";

const Profile = () => {
  const user = getUser();

  if (user) {
    console.log(user);
  }

  return (
    <main className="flex justify-around h-full font-RaleWayFont">
      <section className=" border-r-2 border-darkWood/70 last:border-none w-[30%]">
        <div className="mx-4">
          <div>
            <h2 className="text-3xl mt-[2rem] tracking-wider border-b-2 capitalize font-medium border-darkWood/70 pb-[1rem] ">
              Profile information
            </h2>
            <div className="my-4 capitalize ">
              <h3>Full name: </h3>
              {/* <p>{user}</p> */}
              {user && user.data.fullName ? (
                <p className="opacity-70 font- capitalize">
                  {user.data.fullName}
                </p>
              ) : (
                <p className="opacity-70 capitalize">
                  please update your profile
                </p>
              )}
            </div>
            <div className="my-4 capitalize ">
              <h3 className="capitalize ">user name :</h3>
              {user && user.data.username ? (
                <p className="opacity-70 font- capitalize">
                  {user.data.username}
                </p>
              ) : (
                <p className="opacity-70 capitalize">loading...</p>
              )}
            </div>
            <div className="my-4 capitalize ">
              <h3>role : </h3>
              {user && user.data.role ? (
                <p className="opacity-70 capitalize">{user.data.role}</p>
              ) : (
                <p className="opacity-70 capitalize">loading...</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-4xl mt-[2rem] tracking-wider border-b-2 capitalize font-medium border-darkWood/70 pb-[1rem]">
              contact info
            </h2>
            <div className="my-4">
              <h3 className="text-lg capitalize pb-1">email address: </h3>
              {/* <p>{user}</p> */}
              {user && user.data.email ? (
                <p className="opacity-70 ">{user.data.email}</p>
              ) : (
                <p className="opacity-70 ">loading...</p>
              )}
            </div>
            <div className="my-4">
              <h3 className="text-lg capitalize pb-1">Full name: </h3>
              {/* <p>{user}</p> */}
              {user && user.data.phone ? (
                <p className="opacity-70 capitalize">{user.data.phone}</p>
              ) : (
                <p className="opacity-70 capitalize">loading...</p>
              )}
            </div>
            <div className="my-4">
              <h3 className="text-lg capitalize pb-1">address: </h3>
              {/* <p>{user}</p> */}
              {user && user.data.address ? (
                <p className="opacity-70 capitalize">{user.data.address}</p>
              ) : (
                <p className="opacity-70 capitalize">
                  please update your profile
                </p>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </section>
      <section className=" border-r-2 border-darkWood/70 last:border-none w-[50%] ">
        <div className="flex justify-between bg-slate-400 py-3 lowercase rounded-md px-[3rem] ">
          <button>update pasword</button>
          <button>update profile information </button>
          <button>update contact information</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
