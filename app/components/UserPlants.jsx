"use client";
import React, { useState, useEffect } from "react";
import DisplayUserPlants from "./DisplayUserPlants";
import IsLoading from "./IsLoading";
import styles from "./UserPlants.module.css";
import { subTitle } from "../fonts";

const UserPlants = () => {
  const [myPlantsArray, setMyPlantsArray] = useState([]);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getMyPlants = async () => {
    try {
      const response = await fetch(`/api/plants/myplants`);
      const userPlants = await response.json();
      setMyPlantsArray(userPlants);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  function displayPlants() {
    if (isLoading) return <IsLoading />;
    if (!myPlantsArray) return <div>You have no plants.</div>;
    if (error) return <div>{error}</div>;
    return myPlantsArray.map((plant) => (
      <DisplayUserPlants key={plant._id} plant={plant} />
    ));
  }

  function toggleDisplay() {
    setIsDisplaying(!isDisplaying);
  }

  useEffect(() => {
    setIsLoading(true);
    getMyPlants();
  }, []);

  return (
    <>
      <button
        onClick={toggleDisplay}
        className={styles.seePlantsButton}
        style={subTitle.style}
      >
        See my plants
      </button>
      {isDisplaying ? displayPlants() : null}
    </>
  );
};

export default UserPlants;
