import React, { useState } from "react";

const AddStaff = () => {
  const baseUrl = "http://localhost:8000/api/v1/users";

  const [formData, setformData] = useState({
    staffEmail: "",
    staffPassword: "",
    role: "staff",
  });

  const onChangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Oak Ave",
    },
    {
      name: "Alice Brown",
      email: "alice@example.com",
      phone: "555-555-5555",
      address: "789 Pine Ln",
    },
  ];

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
                    name="staffEmail"
                    value={formData.staffEmail}
                    onChange={onChangeHandler}
                    className="px-2 py-2 w-full outline-none rounded-sm"
                  />
                  <input
                    type="text"
                    placeholder="password"
                    name="staffPassword"
                    value={formData.staffPassword}
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
                  <option value="staff">staff</option>
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
          <div className="border border-gray-500 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex border-b border-gray-500 p-2">
              <div className="flex-1 font-medium text-gray-700">Name</div>
              <div className="flex-1 font-medium text-gray-700">Email</div>
              <div className="flex-1 font-medium text-gray-700">Phone</div>
              <div className="flex-1 font-medium text-gray-700">Address</div>
              <div className="w-20 font-medium text-gray-700">Edit</div>
            </div>

            {/* Data Rows */}
            {data.map((row, index) => (
              <div
                key={index}
                className="flex p-2 border-b border-gray-500 last:border-none bg-white"
              >
                <div className="flex-1 text-gray-700">{row.name}</div>
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
      </section>
    </main>
  );
};

export default AddStaff;
