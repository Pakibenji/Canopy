"use client";
import React, { useState, useEffect, useCallback } from "react";
import IsLoading from "./IsLoading";
import DisplayAllPlants from "./Display/DisplayAllPlants";
import { useSession } from "next-auth/react";

const AllPlants = () => {
  const [allPlantsArray, setAllPlantsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    data: session,
    status,
    error: sessionError,
  } = useSession({ fallback: <IsLoading /> });

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

  if (sessionError) {
    return <div>{sessionError.message}</div>;
  }

  if (isLoading) {
    return <IsLoading />;
  }

  if (allPlantsArray.length === 0) {
    return <p>There are no plants.</p>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return allPlantsArray.map((plant) => (
    <DisplayAllPlants key={plant._id} plant={plant} session={session} />
  ));
};

export default AllPlants;