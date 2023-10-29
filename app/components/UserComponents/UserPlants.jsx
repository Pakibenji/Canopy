"use client";
import React, { useState } from "react";
import DisplayUserPlants from "../Display/DisplayUserPlants";
import IsLoading from "../IsLoading";
import Button from "../Button";
import usePlants from "@/utils/usePlants";

const UserPlants = () => {
  const { myPlantsArray, isLoading, error } = usePlants("myPlants");
  const [isDisplaying, setIsDisplaying] = useState(false);

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
