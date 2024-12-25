import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoIosArrowDown } from "react-icons/io";

const Illnesses = () => {
  const baseUrl = "http://localhost:8000/api/v1/illnesses";
  const token = Cookies.get("token");

  const [fetchIllness, setFetchIllness] = useState([]);

  const getAllIllness = async () => {
    try {
      const getData = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!getData.ok) {
        console.log("failed to fetch illnesses");
      }

      const response = await getData.json();
      setFetchIllness(response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  useEffect(() => {
    getAllIllness();
  }, []);

  console.log(fetchIllness);

  return (
    <main>
      {/* form */}
      <section>
        <form className="flex justify-between">
          <div className="w-[60%] ">
            <input
              type="text"
              placeholder="name of illness"
              name="illness"
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
            <textarea
              name="description"
              placeholder="discribtion"
              className="w-full resize-none outline-none px-4 py-2 rounded-md mt-4 "
              rows={7}
            />
            <div>
              <button className="px-[4rem] py-2 bg-darkWood text-white rounded-md mt-5 ">
                submit
              </button>
            </div>
          </div>
          <div className="w-[30%] ">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
              <input
                type="text"
                className="px-4 py-2 outline-none rounded-md"
                placeholder="medicine"
              />
            </div>
          </div>
        </form>
      </section>

      {/* Illnesses card section here */}
      <section className="mt-[3rem]">
        <div className="overflow-hidden h-[21rem] overflow-y-auto scrollbar-hidden">
          <div className="flex gap-x-[2rem] gap-y-[1rem] flex-wrap overflow-hidden">
            {/* seting backData into card */}
            {fetchIllness.map((illness) => {
              return (
                <div className="w-[30rem] h-[18rem] border-2 rounded-lg px-4 py-4 overflow-hidden  ">
                  <h2 className="font-RaleWayFont uppercase font-semibold tracking-wider text-3xl text-gray-800 ">
                    {illness.illnessName}
                  </h2>
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-interFont capitalize text-lg tracking-wide ">
                        Reasons :
                      </h2>
                      <p className="tracking-wider font-RaleWayFont h-[90%] overflow-hidden text-sm w-[90%]">
                        {illness.description}
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 justify-end ">
                        {illness.medicines.map((medicine, index) => {
                          return (
                            <div key={index} className="flex ">
                              <div>
                                <h3 className="px-[2rem] py-1 bg-darkWood text-white rounded-md ">
                                  {medicine}
                                </h3>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center capitalize font-RaleWayFont tracking-wider ">
          <h1>Scroll to see more</h1>
          <IoIosArrowDown />
        </div>
      </section>
    </main>
  );
};

export default Illnesses;
