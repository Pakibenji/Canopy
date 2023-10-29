"use client";
import { useState, useEffect, useCallback } from "react";

const usePlants = (action, plantData) => {
  const [allPlantsArray, setAllPlantsArray] = useState([]);
  const [myPlantsArray, setMyPlantsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  switch (action) {
    case "allPlants":
      useEffect(() => {
        getAllPlants();
      }, []);
      break;
    case "myPlants":
      useEffect(() => {
        getMyPlants();
      }, []);
      break;
    case "createPlant":
      useEffect(() => {
        createPlant(plantData);
      }, []);
      break;
    case "editPlant":
      useEffect(() => {
        editPlant(plantData);
      }, []);
      break;
    default:
      break;
  }

  const getAllPlants = useCallback(async () => {
    try {
      const response = await fetch("/api/plants/all");
      const allPlants = await response.json();
      setAllPlantsArray(allPlants);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);

  const getMyPlants = useCallback(async () => {
    try {
      const response = await fetch("/api/plants/myplants");
      const myPlants = await response.json();
      setMyPlantsArray(myPlants);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);

  const createPlant = async (plantData) => {
    try {
      const res = await fetch("/api/plants/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const editPlant = async (plantData) => {
    try {
      const response = await fetch(`/api/plants/edit/${plantData.plantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      } else {
        return "Plant successfully edited!";
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to edit plant");
    }
  };

  return {
    allPlantsArray,
    createPlant,
    editPlant,
    myPlantsArray,
    isLoading,
    error,
    message,
  };
};

export default usePlants;
