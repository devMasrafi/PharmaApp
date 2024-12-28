import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useGetMedicine = () => {
  const baseUrl = "http://localhost:8000/api/v1/medicines";
  const [fetchedMedicine, setFetchedMedicine] = useState([]);
  const [error, setError] = useState(null);

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
      setFetchedMedicine(response);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllMedicines();
  }, []);

  return { fetchedMedicine, error, refresh: getAllMedicines };
};

export default useGetMedicine;
