import React from "react";

const NotFound = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="text-center ">
        <h2 className="text-5xl font-interFont  capitalize font-bold pb-3 ">
          404 not found
        </h2>
        <p className="uppercase font-interFont ">
          the page you looking for dose not exist
        </p>
        <button className="px-6 py-2 bg-darkWood text-white rounded-md mt-[2rem] capitalize font-interFont ">
          Go back
        </button>
      </div>
    </main>
  );
};

export default NotFound;
