import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../fonts";

const DisplayUserPlants = ({ plant }) => {
  const { name, type, plantImage } = plant;
  return (
    <div className={styles.plantContainer}>
      <h3 style={subTitle.style} className={styles.plantName}>{name}</h3>
      <p className={styles.plantType}>{type}</p>
    </div>
  );
};
export default DisplayUserPlants;
