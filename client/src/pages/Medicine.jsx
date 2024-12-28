import { useRef } from "react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useGetMedicine from "../components/useGetMedicine";

const Medicine = () => {
  const baseUrl = "http://localhost:8000/api/v1/medicines";
  const { fetchedMedicine, error, refresh } = useGetMedicine();
  const [searchQuery, setSearchQuery] = useState("");

  // input field reworking
  const [tagInput, setTagInput] = useState("");
  const [filteredTags, setFilteredTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "fever",
    "cold",
    "headache",
    "flu",
    "cough",
  ]); // Predefined tags

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

    setMedicineData((prevData) => {
      if (name === "illnesses") {
        return {
          ...prevData,
          [name]: value.split(",").map((item) => item.trim().toLowerCase()),
        };
      }

      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // input tag handler
  const handleTagInput = (e) => {
    const value = e.target.value;
    setTagInput(value);

    if (value.trim() === "") {
      setFilteredTags([]);
    } else {
      setFilteredTags(
        availableTags.filter((tag) =>
          tag.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleTagSelect = (tag) => {
    if (!medicineData.illnesses.includes(tag)) {
      setMedicineData((prevData) => ({
        ...prevData,
        illnesses: [...prevData.illnesses, tag],
      }));
      setAvailableTags((prevTags) => prevTags.filter((t) => t !== tag));
    }
    setTagInput("");
    setFilteredTags([]);
  };

  const handleTagRemove = (tag) => {
    setMedicineData((prevData) => ({
      ...prevData,
      illnesses: prevData.illnesses.filter((t) => t !== tag),
    }));
    setAvailableTags((prevTags) => [...prevTags, tag]);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // mouse whele control and click and hold control
  const scrollContainerRef = useRef(null);

  // Enable mouse wheel horizontal scrolling
  const handleWheelScroll = (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // Enable click-and-drag scrolling
  let isDragging = false;
  let startX, scrollLeft;

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging = false;
  };

  const handleMouseUp = () => {
    isDragging = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // Adjust scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(medicineData);

    const token = Cookies.get("token");
    if (!token) {
      console.log("no token in cookie");
      return;
    }

    // filter MedicineData.illnesses to remove empty strings

    const filteredMedicineData = medicineData.illnesses.filter(
      (illness) => illness && illness.trim() !== ""
    );

    const payload = {
      ...medicineData,
      illnesses: filteredMedicineData,
    };

    try {
      const medicineCreation = await fetch(`${baseUrl}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const response = await medicineCreation.json();

      if (!medicineCreation.ok) {
        console.log("Failed to create medicine");
      }

      console.log("medicine created successfully", response);

      if (medicineCreation.ok) {
        alert("Medicine created successfully");
      }

      // clear form
      setMedicineData({
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

      refresh();
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  // Filter medicines based on search query
  const filterMedicines = searchQuery
    ? fetchedMedicine.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : fetchedMedicine;

  // Search handler
  const handleSearchForList = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main>
      {/* medicine info */}
      <section>
        <form onSubmit={onSubmitHandler} className="flex justify-between">
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

              {/* Illnesses */}
              {/* Dynamic Illness Input */}
              <div className="relative mb-4 resize-none">
                {/* Container for tags and input */}
                <div className="bg-white flex items-center border rounded-md px-2 py-1 gap-2 max-w-[25rem] overflow-hidden w-[25rem] min-h-[3rem]">
                  {/* Always Visible Input Field */}
                  <div className="shrink-0">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInput}
                      placeholder="Type illness..."
                      className="outline-none px-2 py-1 w-[8rem]"
                    />
                  </div>

                  {/* Scrollable Tags Container */}
                  <div
                    ref={scrollContainerRef}
                    onWheel={handleWheelScroll}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex gap-2 overflow-x-auto flex-nowrap scrollbar-hidden flex-1"
                    style={{ userSelect: "none" }}
                  >
                    {medicineData.illnesses.map((tag, index) => (
                      <div
                        key={index}
                        className="border-2 border-darkWood px-2 py-1 rounded-md flex items-center shrink-0"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 text-darkWood"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions Dropdown */}
                {filteredTags.length > 0 && (
                  <ul className="absolute left-0 mt-1 w-[12rem] border rounded-md bg-white shadow-lg max-h-[10rem] overflow-y-auto z-10">
                    {filteredTags.map((tag, index) => (
                      <li
                        key={index}
                        onClick={() => handleTagSelect(tag)}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
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
                onChange={handleSearchForList}
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
              <div className="w-20 font-medium text-gray-700">Edit</div>
            </div>

            {/* Data Rows */}
            <div className="rounded-b-lg overflow-hidden h-[19rem] overflow-y-auto scrollbar-hidden">
              {filterMedicines
                .slice()
                .reverse()
                .map((row, index) => (
                  <div
                    key={index}
                    className="flex p-2 border-b border-gray-500 last:border-none bg-white"
                  >
                    <div className="flex-1 text-gray-700">{row.name}</div>
                    <div className="flex-1 text-gray-700">
                      {row.manufacturer}
                    </div>
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
