import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/Constant";
import { useAuth } from "../context/AuthContext";
import IndicesCard from "./IndicesCard";

const IndicesHome = () => {
  const [indices, setIndices] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    fetchIndices();
  }, []);

  const fetchIndices = async () => {
    try {
      if (!isLoggedIn) {
        console.error("User is not logged in. Cannot fetch indices.");
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/market/indices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (response.status === 200 && response.data && response.data.data) {
        const indicesData = response.data.data;
        const formattedData = Object.keys(indicesData).map((key) => ({
          name: key,
          ...indicesData[key],
        }));
        setIndices(formattedData);
      }
    } catch (error) {
      console.error("Error fetching indices:", error);
    }
  };

  const filterdIndices = useMemo(() => {
    const filtered = indices.filter((index) => index.name !== "status");
    console.log("filtered indices: ", filtered);
    return filtered;
  });

  return (
    <div className="flex justify-around items-center py-4">
      {filterdIndices &&
        isLoggedIn &&
        filterdIndices?.map((index, idx) => (
          <IndicesCard index={index} key={idx} />
        ))}
      {!isLoggedIn && (
        <div className="text-center text-red-500">
          Please log in to view indices.
        </div>
      )}
    </div>
  );
};

export default IndicesHome;
