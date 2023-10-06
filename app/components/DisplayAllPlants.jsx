import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../fonts";

const DisplayAllPlants = ({ plant, session }) => {
  const { name, type, plantImage, proprietary } = plant;
  return (
    <div className={styles.plantContainer}>
      <h3 style={subTitle.style} className={styles.plantName}>{name}</h3>
      <img className={styles.plantImage} src={plantImage} alt="plantImage" />
      <p className={styles.plantType}>{type}</p>
      <p className={styles.plantProprietary}>{proprietary}</p>
    </div>
  );
};
export default DisplayAllPlants;
