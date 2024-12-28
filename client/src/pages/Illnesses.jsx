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
  // console.log(fetchIllness);

  // handling form

  const [illnessFormData, setIllnessFormData] = useState({
    illnessName: "",
    description: "",
    medicines: ["", ""],
  });

  const handelChange = (e) => {
    setIllnessFormData({
      ...illnessFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMedicineChange = (e, index) => {
    const updatedMedicines = [...illnessFormData.medicines];
    updatedMedicines[index] = e.target.value;
    setIllnessFormData({
      ...illnessFormData,
      medicines: updatedMedicines,
    });
  };

  // Add a new medicine input
  const addMedicineField = () => {
    setIllnessFormData((prev) => ({
      ...prev,
      medicines: [...prev.medicines, "", ""],
    }));
  };

  // clear form
  const onClearHandler = (e) => {
    e.preventDefault();
    setIllnessFormData({
      illnessName: "",
      description: "",
      medicines: ["", ""],
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(illnessFormData);

    const token = Cookies.get("token");

    if (!illnessFormData.illnessName.trim()) {
      return alert("Illness name is required!");
    }

    if (!illnessFormData.description.trim()) {
      return alert("Description is required!");
    }

    const filteredMedicinesInput = illnessFormData.medicines.filter(
      (medicine) => medicine && medicine.trim() !== ""
    );

    console.log("after filter", filteredMedicinesInput);

    const payload = {
      ...illnessFormData,
      medicines: filteredMedicinesInput,
    };
    // console.log("after setting payload", payload);

    try {
      const illnessCreation = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });

      const response = await illnessCreation.json();

      if (!illnessCreation.ok) {
        console.log(response.message || "Failed to create staff");
      }

      console.log("illness created successfully:", response);

      getAllIllness();
    } catch (error) {
      console.log("failed to post illness", error.message);
    }
  };

  return (
    <main>
      {/* form */}
      <section>
        <form onSubmit={onSubmitHandler} className="flex justify-between">
          <div className="w-[60%] ">
            <input
              type="text"
              placeholder="name of illness"
              name="illnessName"
              value={illnessFormData.illnessName}
              onChange={handelChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
            />
            <textarea
              name="description"
              placeholder="description"
              value={illnessFormData.description}
              onChange={handelChange}
              className="w-full resize-none outline-none px-4 py-2 rounded-md mt-4 "
              rows={7}
            />
            <div className="flex justify-between ">
              <button
                type="button"
                onClick={onClearHandler}
                className="px-[4rem] py-2 bg-red-400 capitalize font-RaleWayFont font-semibold rounded-md mt-5"
              >
                clear
              </button>
              <button
                type="submit"
                className="px-[4rem] py-2 bg-darkWood font-RaleWayFont capitalize tracking-wider text-white rounded-md mt-5"
              >
                submit
              </button>
            </div>
          </div>
          <div className="w-[35%] h-[20rem] overflow-hidden ">
            <div className="w-[95%] mx-auto h-full overflow-y-auto">
              <div className="flex flex-wrap ">
                {illnessFormData.medicines.map((medicine, index) => (
                  <input
                    key={index}
                    type="text"
                    value={medicine}
                    onChange={(e) => handleMedicineChange(e, index)}
                    className="px-4 py-2 w-[49%] outline-none rounded-md border border-gray-300"
                    placeholder={`Medicine ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={addMedicineField}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
              >
                + Add Medicine
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Illnesses card section here */}
      <section className="mt-[3rem] border-t-2 border-gray-500">
        <div className="overflow-hidden h-[21rem] overflow-y-auto scrollbar-hidden pt-3">
          <div className="flex gap-x-[2rem] gap-y-[1rem] flex-wrap overflow-hidden">
            {/* seting backData into card */}
            {fetchIllness.map((illness) => {
              return (
                <div
                  key={illness._id}
                  className="w-[30rem] h-[18rem] border-2 rounded-lg px-4 py-4 overflow-hidden  "
                >
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
