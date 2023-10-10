"use client";
import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../fonts";
import { useSession } from "next-auth/react";
const DisplayPlant = ({ plant }) => {
  const { data: session } = useSession();
  const { name, description, type, plantImage, proprietary, _id } = plant;

  function displayPlantDetail() {
    <div className={styles.plantContainer}>
        <h3 style={subTitle.style} className={styles.plantName}>
          {name}
        </h3>
        <img className={styles.plantImage} src={plantImage} alt={name} />
        <p className={styles.plantDescription}>{description}</p>
        <p className={styles.plantType}>{type}</p>
        <p className={styles.plantProprietary}>{proprietary}</p>
      </div>
  }

  return (
    <>
    </>
  );
};

export default DisplayPlant;
