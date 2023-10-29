"use client";
import React, { useEffect } from "react";
import IsLoading from "./IsLoading";
import DisplayAllPlants from "./Display/DisplayAllPlants";
import { useSession } from "next-auth/react";
import usePlants from "@/utils/usePlants";

const AllPlants = () => {
  const {
    data: allPlantsArray,
    isLoading,
    error,
    fetchData: getAllPlants,
  } = usePlants("getAllPlants");
  const { data: session, error: sessionError } = useSession({
    fallback: <IsLoading />,
  });

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
