"use client";
import React, { useState, useEffect } from "react";
import DisplayUserPlants from "../Display/DisplayUserPlants";
import IsLoading from "../IsLoading";
import Button from "../Button";
import usePlants from "@/utils/usePlants";

const UserPlants = () => {
  const {
    data: myPlantsArray,
    isLoading,
    error,
    fetchData: getMyPlants,
  } = usePlants("getMyPlants");
  const [isDisplaying, setIsDisplaying] = useState(false);

  useEffect(() => {
    getMyPlants();
  }, [getMyPlants]);
  function toggleDisplay() {
    setIsDisplaying(!isDisplaying);
  }

  if (isLoading) {
    return <IsLoading />;
  }

  if (myPlantsArray.length === 0) {
    return <p>There are no plants.</p>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  function displayPlants() {
    return myPlantsArray.map((plant) => (
      <DisplayUserPlants key={plant._id} plant={plant} />
    ));
  }

  return (
    <>
      <Button func={toggleDisplay} name="my plants" />
      {isDisplaying ? displayPlants() : null}
    </>
  );
};

export default UserPlants;
