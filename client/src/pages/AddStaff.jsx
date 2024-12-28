import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const AddStaff = () => {
  const baseUrl = "http://localhost:8000/api/v1/users";

  const [userData, setUserData] = useState([]);
  const [formData, setformData] = useState({
    email: "",
    password: "",
    role: "staff",
  });

  const getAllUsers = async () => {
    try {
      const allUserData = await fetch(`${baseUrl}`);
      const response = await allUserData.json();
      setUserData(response); // Update state with API response
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  // console.log(userData)

  const onChangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found, please log in first.");
      return;
    }

    try {
      const staffCreation = await fetch(`${baseUrl}/addstaff`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      const response = await staffCreation.json();

      if (!staffCreation.ok) {
        console.log(response.message || "Failed to create staff");
      }

      console.log("Staff created successfully:", response);

      // auto refresh list if successfull

      getAllUsers();
    } catch (error) {
      console.error("Error creating staff:", error.message);
    }
  };

  return (
    <main>
      <section>
        {/* addin staff members */}
        <div>
          <form onSubmit={onSubmitHandler}>
            <div className="flex justify-around  ">
              <div>
                <div className="w-[48rem] flex gap-x-6  ">
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    className="px-2 py-2 w-full outline-none rounded-sm"
                  />
                  <input
                    type="text"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    className="px-2 py-2  w-full outline-none rounded-sm "
                  />
                </div>
                <select
                  className="outline-none px-6 py-2 rounded-md mt-5 font-interFont font-light capitalize text-lg"
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={onChangeHandler}
                >
                  <option value="">staff</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div>
                <button className=" bg-darkWood px-[4rem] py-2 text-white capitalize font-interFont tracking-wider rounded-md">
                  add staff
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* list of staff members */}
        <div className=" p-6 mt-[8rem] ">
          <div className="border border-gray-500 rounded-lg ">
            {/* Header */}
            <div className="flex border-b border-gray-500 p-2">
              <div className="flex-1 font-medium text-gray-700">Name</div>
              <div className="flex-1 font-medium text-gray-700">Email</div>
              <div className="flex-1 font-medium text-gray-700">Phone</div>
              <div className="flex-1 font-medium text-gray-700">Address</div>
              <div className="w-20 font-medium text-gray-700">Edit</div>
            </div>

            {/* Data Rows */}
            <div className="rounded-b-lg overflow-hidden h-[22rem] overflow-y-auto scrollbar-hidden">
              {userData.map((row, index) => (
                <div
                  key={index}
                  className="flex p-2 border-b border-gray-500 last:border-none bg-white"
                >
                  <div className="flex-1 text-gray-700">{row.username}</div>
                  <div className="flex-1 text-gray-700">{row.email}</div>
                  <div className="flex-1 text-gray-700">{row.phone}</div>
                  <div className="flex-1 text-gray-700">{row.address}</div>
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

export default AddStaff;
