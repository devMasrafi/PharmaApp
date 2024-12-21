import React, { useState } from "react";
import { useNavigate } from "react-router";


import Cookies from "js-cookie";

const Login = () => {
  const baseUrl = "http://localhost:8000/api/v1/users/login";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      const loginData = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await loginData.json();
      console.log(response.data.userFound);

      Cookies.set("token", response.data.token, { expires: 1 });
      Cookies.set('role', response.data.userFound.role, {expires: 1} )
      //   console.log(data.token);

      //   if ok navigate to overview
        navigate("/");
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  return (
    <main className=" flex justify-center items-center h-screen">
      <section className="w-[18rem] bg-white rounded-md ">
        <div>
          <div className="w-[16rem] h-[18rem] mx-auto ">
            <h2 className="font-RaleWayFont font-semibold text-2xl text-center my-4">
              Login
            </h2>
            <form onSubmit={onSubmitHandler} action="submit">
              <div className="mb-8 ">
                <div>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    className="border border-2-darkWood w-full px-2 py-1 mb-4 rounded-md "
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={onChangeHandler}
                    className="border border-2-darkWood w-full px-2 py-1 mb-4 rounded-md "
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <button className="bg-darkWood w-full py-2 rounded-md text-lg mb-2 capitalize text-white ">
                  login
                </button>
                <div className="flex justify-center ">
                  <button className="bg-darkWood px-4 py-1 rounded-md  capitalize text-white">
                    demo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
