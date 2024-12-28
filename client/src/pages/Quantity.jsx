import React, { useEffect, useState } from "react";
import useGetMedicine from "../components/useGetMedicine";
import Cookies from "js-cookie";

const Quantity = () => {
  const baseUrl = "http://localhost:8000/api/v1/medicines";

  const { fetchedMedicine, error, refresh } = useGetMedicine();
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState({
    id: "",
    name: "",
    stock: 0,
  });
  const [medicineData, setMedicineData] = useState({
    additionalStock: 0,
  });

  const handleSelectedMedicine = (medicine) => {
    setSelectedMedicine({
      id: medicine._id,
      name: medicine.name,
      stock: medicine.stock,
    });
    setMedicineData({
      additionalStock: 0,
    });
  };

  // search filtering
  const filterMedicines = searchQuery
    ? fetchedMedicine.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : fetchedMedicine;
 
  const handlerSearchFilter = (e) =>{
    setSearchQuery(e.target.value)
  }

  // updating Quantity
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedMedicine.id) {
      alert("Please select a medicine to update the quantity");
      return;
    }

    const token = Cookies.get("token");

    try {
      const updatedStock =
        Number(selectedMedicine.stock) + Number(medicineData.additionalStock);

      const updateQuantity = await fetch(`${baseUrl}/${selectedMedicine.id}`, {
        method: "PUT",
        body: JSON.stringify({
          stock: updatedStock,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!updateQuantity.ok) {
        console.log("Quantity updated successfully");
        return;
      }

      const response = await updateQuantity.json();
      console.log("update successfully", response);

      setSelectedMedicine({
        id: "",
        name: "",
        stock: "",
      });
      setMedicineData({
        stock: "",
      });
      setIsTyping(false);

      refresh();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <main>
      <section>
        <div className="">
          <form onSubmit={onSubmitHandler} className="flex justify-evenly ">
            <div className="flex justify-between gap-x-[3rem]">
              <h2 className="w-[24rem] py-2 px-3 rounded-md bg-white">
                Name of Medicine :{" "}
                <span className="font-semibold tracking-wider capitalize text-darkWood/80">
                  {selectedMedicine.name || "Select a medicine"}
                </span>
              </h2>
              <div className="relative w-[24rem]">
                {/* Current Stock Display */}
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 opacity-70 pointer-events-none">
                  {selectedMedicine.stock} +
                </span>

                {/* User Input */}
                <input
                  type="number"
                  placeholder="Add quantity"
                  value={isTyping ? medicineData.additionalStock : ""}
                  onFocus={() => {
                    setMedicineData({ additionalStock: "" }); // Clear input when focused
                    setIsTyping(true); // Start typing mode
                  }}
                  onBlur={() => {
                    if (medicineData.additionalStock === "") {
                      setIsTyping(false); // Exit typing mode if input is empty
                    }
                  }}
                  onChange={(e) => {
                    setMedicineData({
                      ...medicineData,
                      additionalStock: Number(e.target.value),
                    });
                  }}
                  className="w-full py-2 px-3 rounded-md outline-none bg-white text-black pl-12"
                />
              </div>
            </div>
            <button className=" bg-darkWood px-[6rem] py-2 text-white capitalize font-interFont tracking-wider rounded-md">
              update
            </button>
          </form>
        </div>
      </section>
      <section>
        <div className=" p-6 mt-[5rem] ">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-2xl font-medium font-interFont">
                Medicine List
              </h2>
            </div>
            <div>
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={handlerSearchFilter}
                className="px-2 py-2 outline-none rounded-md w-[15rem] "
              />
            </div>
          </div>
          <div className="border border-gray-500 rounded-lg ">
            {/* Header */}
            <div className="flex border-b border-gray-500 p-2">
              <div className="flex-1 font-medium text-gray-700">Name</div>
              <div className="flex-1 font-medium text-gray-700">
                manufacturer
              </div>
              <div className="flex-1 font-medium text-gray-700">quantity</div>
              <div className="w-20 font-medium text-gray-700">Edit</div>
            </div>

            {/* Data Rows */}
            <div className="rounded-b-lg overflow-hidden h-[31rem] overflow-y-auto scrollbar-hidden">
              {filterMedicines.map((row, index) => (
                <div
                  key={index}
                  className="flex p-2 border-b border-gray-500 last:border-none bg-white"
                >
                  <div className="flex-1 text-gray-700">{row.name}</div>
                  <div className="flex-1 text-gray-700">{row.manufacturer}</div>
                  <div className="flex-1 text-gray-700">{row.stock}</div>
                  <div className="w-20">
                    <button
                      onClick={() => handleSelectedMedicine(row)}
                      className="text-white px-4 py-1 bg-darkWood rounded-md capitalize"
                    >
                      edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Quantity;
