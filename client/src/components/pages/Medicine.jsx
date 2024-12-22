import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Medicine = () => {
  const baseUrl = "http://localhost:8000/api/v1/medicines";
  const [medicines, setMedicines] = useState([]);
  const [medicineData, setMedicineData] = useState({
    name: "",
    manufacturer: "",
    illnesses: [],
    stock: "",
    buyPrice: "",
    sellPrice: "",
    sellerInfo: {
      sellerName: "",
      sellerContactNumber: "",
      sellerEmail: "",
    },
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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "illnesses") {
      setMedicineData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else if (name.includes(".")) {
      // handle nested fields
      const [parent, child] = name.split(".");
      setMedicineData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      // handle top-level fields
      setMedicineData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(medicineData);

    const token = Cookies.get("token");
    if (!token) {
      console.log("no token in cookie");
      return;
    }

    try {
      const medicineCreation = await fetch(`${baseUrl}`, {
        method: "POST",
        body: JSON.stringify(medicineData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const response = await medicineCreation.json();

      if (!medicineCreation.ok) {
        console.log("Failed to create medicine");
      }

      // console.log("medicine created successfully", response);

      getAllMedicines();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <main>
      {/* medicine info */}
      <section>
        <form onSubmit={onSubmitHandler} className="flex justify-evenly">
          <div className="flex gap-x-6">
            <div>
              <div>
                <input
                  type="text"
                  placeholder="medicine name"
                  name="name"
                  value={medicineData.name}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="illness"
                  name="illnesses"
                  value={medicineData.illnesses.join(", ")}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="quantity"
                  name="stock"
                  value={medicineData.stock}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="manufecturer"
                  name="manufacturer"
                  value={medicineData.manufacturer}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div>
                <div>
                  <input
                    type="number"
                    placeholder="buy price"
                    name="buyPrice"
                    value={medicineData.buyPrice}
                    onChange={onChangeHandler}
                    className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="sell price"
                    name="sellPrice"
                    value={medicineData.sellPrice}
                    onChange={onChangeHandler}
                    className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                  />
                </div>
              </div>
            </div>
          </div>
          {/* seller info */}
          <div className="flex justify-end">
            <div>
              <div>
                <input
                  type="text"
                  placeholder="seller name"
                  name="sellerInfo.sellerName"
                  value={medicineData.sellerInfo.sellerName}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="seller phone"
                  name="sellerInfo.sellerContactNumber"
                  value={medicineData.sellerInfo.sellerContactNumber}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none "
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="seller email"
                  name="sellerInfo.sellerEmail"
                  value={medicineData.sellerInfo.sellerEmail}
                  onChange={onChangeHandler}
                  className="w-[25rem] px-3 py-2 rounded-md mb-4 outline-none  "
                />
              </div>
              <button className="bg-darkWood w-full py-2 rounded-md text-lg mb-2 capitalize text-white ">
                add medicine
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* medicine list */}
      <section>
        <div className=" p-6 mt-[8rem] ">
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
              <div className="w-20 font-medium text-gray-700">Edit</div>
            </div>

            {/* Data Rows */}
            <div className="rounded-b-lg overflow-hidden h-[19rem] overflow-y-auto scrollbar-hidden">
              {medicines.map((row, index) => (
                <div
                  key={index}
                  className="flex p-2 border-b border-gray-500 last:border-none bg-white"
                >
                  <div className="flex-1 text-gray-700">{row.name}</div>
                  <div className="flex-1 text-gray-700">{row.manufacturer}</div>
                  <div className="flex-1 text-gray-700">{row.stock}</div>
                  <div className="flex-1 text-gray-700">{row.buyPrice}</div>
                  <div className="flex-1 text-gray-700">{row.sellPrice}</div>
                  <div className="w-20">
                    <button className="text-blue-500 hover:underline">
                      Edit
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

export default Medicine;
