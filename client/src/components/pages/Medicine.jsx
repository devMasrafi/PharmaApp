import React, { useState } from "react";

const Medicine = () => {
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(medicineData);
  };

  return (
    <main>
      <section>
        <form onSubmit={onSubmitHandler} className="flex justify-evenly">
          {/* medicine info */}
          <div className="flex gap-x-6 ">
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
      <section></section>
    </main>
  );
};

export default Medicine;
