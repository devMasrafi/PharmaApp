import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const getUser = () => {
  const baseUrl = "http://localhost:8000/api/v1/users";
  const [logedInUser, setLogedInUser] = useState(null);

  const token = Cookies.get("token");

  const getUser = async () => {
    try {
      const getData = await fetch(`${baseUrl}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (!getData.ok) {
        console.log("failed to fetch user");
      }

      const response = await getData.json();
      // console.log(response);
      setLogedInUser(response);
    } catch (error) {
      console.log({ message: error.message });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return logedInUser;
};

export default getUser;
