'use client';
import { useState, useEffect, useCallback } from "react";

const usePlants = () => {
  const [allPlantsArray, setAllPlantsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    getAllPlants();
  }, [getAllPlants]);

  return { allPlantsArray, isLoading, error };
};

export default usePlants;