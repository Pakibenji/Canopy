"use client";
import React, { useState, useEffect } from "react";
import DisplayUserPlants from "./DisplayUserPlants";

const UserPlants = () => {
  const [myPlantsArray, setMyPlantsArray] = useState([]);
  const [error, setError] = useState("");

  const getMyPlants = async () => {
    try {
      const response = await fetch(`/api/plants/myplants`);
      const userPlants = await response.json();
      setMyPlantsArray(userPlants);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getMyPlants();
  }, []);

  return (
    <>
      <h3>My Plants</h3>
      {myPlantsArray && myPlantsArray.length > 0 ? (
        myPlantsArray.map((plant) => <DisplayUserPlants key={plant._id} plant={plant} />)
      ) : (
        <div>You have no plants.</div>
      )}
    </>
  );
};

export default UserPlants;
