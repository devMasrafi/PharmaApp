import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Quantity = () => {
  const baseUrl = "http://localhost:8000/api/v1/medicines";

  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState({
    id: "",
    name: "",
    stock: "",
  });
  const [medicineData, setMedicineData] = useState({
    stock: "",
  });

  const getAllMedicines = async () => {
    const token = Cookies.get("token");

    try {
      const allMedicines = await fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!allMedicines.ok) {
        throw new Error("Failed to fetch medicines");
      }
      const response = await allMedicines.json();
      setMedicines(response.data || response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };
  useEffect(() => {
    getAllMedicines();
  }, []);

  // search filter function
  const filterMedicines = searchQuery
    ? medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : medicines;
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectedMedicine = (medicine) => {
    setSelectedMedicine({
      id: medicine._id,
      name: medicine.name,
      stock: medicine.stock,
    });
    setMedicineData({
      stock: medicine.stock,
    });
  };

  // updating Quantity
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedMedicine.id) {
      alert("Please select a medicine to update the quantity");
      return;
    }

    const token = Cookies.get("token");

    try {
      const updateQuantity = await fetch(`${baseUrl}/${selectedMedicine.id}`, {
        method: "PUT",
        body: JSON.stringify({
          stock: medicineData.stock,
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
      console.log('update successfully', response);

      setSelectedMedicine({
        id: "",
        name: "",
        stock: "",
      });
      setMedicineData({
        stock: "",
      });

      getAllMedicines();
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
                  {selectedMedicine.name || "select a medicine"}
                </span>
              </h2>
              <input
                type="text"
                placeholder="new quantity"
                value={medicineData?.stock}
                onChange={(e) => {
                  setMedicineData({
                    ...medicineData,
                    stock: e.target.value,
                  });
                }}
                className="w-[24rem] py-2 px-3 rounded-md outline-none bg-white"
              />
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
                onChange={handleSearch}
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
