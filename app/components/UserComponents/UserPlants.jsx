"use client";
import React, { useState, useEffect, useCallback } from "react";
import DisplayUserPlants from "../Display/DisplayUserPlants"
import IsLoading from "../IsLoading";
import Button from "../Button";

const UserPlants = () => {
  const [myPlantsArray, setMyPlantsArray] = useState([]);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getMyPlants = useCallback(async () => {
    try {
      const response = await fetch(`/api/plants/myplants`);
      const userPlants = await response.json();
      setMyPlantsArray(userPlants);
      setIsLoading(false);
      console.log[myPlantsArray];
    } catch (error) {
      setError(error);
    }
  }, []);

  const displayPlants = useCallback(() => {
    if (isLoading) return <IsLoading />;
    if (myPlantsArray.length === 0) return <div>You have no plants.</div>;
    if (error) return <div>{error}</div>;
    return myPlantsArray.map((plant) => (
      <DisplayUserPlants key={plant._id} plant={plant} />
    ));
  }, [isLoading, myPlantsArray, error]);

  function toggleDisplay() {
    setIsDisplaying(!isDisplaying);
  }

  useEffect(() => {
    setIsLoading(true);
    getMyPlants();
  }, []);

  return (
    <>
      <Button func={toggleDisplay} name="my plants" />
      {isDisplaying ? displayPlants() : null}
    </>
  );
};

export default UserPlants;
