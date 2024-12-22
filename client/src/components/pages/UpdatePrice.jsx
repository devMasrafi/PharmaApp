import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoSearchOutline } from "react-icons/io5";
const UpdatePrice = () => {
  const baseUrl = "http://localhost:8000/api/v1/medicines";
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [medicineData, setMedicineData] = useState({
    buyPrice: "",
    sellPrice: "",
  });

  // btn click medicine info
  const [selectedMedicine, setSelectedMedicine] = useState({
    id: "",
    name: "",
    buyPrice: "",
    sellPrice: "",
  });

  // getting all medicines for list
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
      setMedicines(response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };
  useEffect(() => {
    getAllMedicines();
  }, []);
  const onChangeHandler = (e) => {
    setMedicineData({
      ...medicineData,
      [e.target.name]: e.target.value,
    });
  };

  // getting selected medicine
  const handleSelectedMedicine = (medicine) => {
    setSelectedMedicine({
      id: medicine._id,
      name: medicine.name,
      buyPrice: medicine.buyPrice,
      sellPrice: medicine.sellPrice,
    });
    setMedicineData({
      buyPrice: medicine.buyPrice,
      sellPrice: medicine.sellPrice,
    });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(medicineData);

    if (!selectedMedicine.id) {
      alert("Please select a medicine to update the price");
      return;
    }

    const token = Cookies.get("token");
    // console.log(token);

    try {
      const medicineUpdate = await fetch(`${baseUrl}/${selectedMedicine.id}`, {
        method: "PUT",
        body: JSON.stringify({
          buyPrice: medicineData.buyPrice,
          sellPrice: medicineData.sellPrice,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!medicineUpdate.ok) {
        console.log({ message: "Failed to update price" });
        return;
      }

      const updatedMedicineData = await medicineUpdate.json();
      console.log("update successfully", updatedMedicineData);

      setSelectedMedicine({
        id: "",
        name: "",
        buyPrice: "",
        sellPrice: "",
      });
      setMedicineData({
        buyPrice: "",
        sellPrice: "",
      });

      getAllMedicines();
    } catch (error) {
      console.error("Error updating medicine prices:", error.message);
    }
  };

  // serching/filtering medicines
  const filterMedicines = searchQuery
    ? medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : medicines;
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main>
      {/* update medicine input fields */}
      <section>
        <div>
          <div className="pb-3">
            {/* auto select medicine name from the update btn */}
            <h2 className="font-RaleWayFont text-md tracking-wider font-medium  ">
              Medicine name :
              <span className="capitalize font-interFont text-lg font-medium text-gray-600/70 ">
                {" "}
                {selectedMedicine.name || "select a medicine"}
              </span>
            </h2>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="flex justify-between  ">
              <div>
                <div className="w-[48rem] flex gap-x-6  ">
                  <input
                    type="number"
                    placeholder="buy price"
                    name="buyPrice"
                    value={medicineData.buyPrice}
                    onChange={onChangeHandler}
                    className="px-2 py-2 w-full outline-none rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="sell price"
                    name="sellPrice"
                    value={medicineData.sellPrice}
                    onChange={onChangeHandler}
                    className="px-2 py-2  w-full outline-none rounded-md "
                  />
                </div>
              </div>
              <div>
                <button className=" bg-darkWood px-[4rem] py-2 text-white capitalize font-interFont tracking-wider rounded-md">
                  update price
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* list table */}
      <section>
        <div className=" mt-[8rem] ">
          <div className="flex justify-between items-center pb-[2rem] ">
            <div className=" font-interFont capitalize tracking-wide ">
              <h2>select a medicine to update</h2>
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
              <div className="flex-1 font-medium text-gray-700">buy price</div>
              <div className="flex-1 font-medium text-gray-700">sell price</div>
              <div className="w-20 font-medium text-gray-700">update</div>
            </div>

            {/* Data Rows */}
            <div className="rounded-b-lg overflow-hidden h-[19rem] overflow-y-auto scrollbar-hidden">
              {filterMedicines.map((row, index) => (
                <div
                  key={index}
                  className="flex px-4 py-2 border-b border-gray-500 last:border-none bg-white"
                >
                  <div className="flex-1 text-gray-700">{row.name}</div>
                  <div className="flex-1 text-gray-700">{row.manufacturer}</div>
                  <div className="flex-1 text-gray-700">{row.stock}</div>
                  <div className="flex-1 text-gray-700">{row.buyPrice}</div>
                  <div className="flex-1 text-gray-700">{row.sellPrice}</div>
                  <div className="w-20">
                    <button
                      onClick={() => handleSelectedMedicine(row)}
                      className="text-white px-4 py-1 bg-darkWood rounded-md"
                    >
                      update
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

export default UpdatePrice;
