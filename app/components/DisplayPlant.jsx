"use client";
import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../fonts";

const DisplayPlant = () => {

  return;
  <div className={styles.plantContainer}>
    <h3 style={subTitle.style} className={styles.plantName}>
      {name}
    </h3>
    <img className={styles.plantImage} src={plantImage} alt={name} />
    <p className={styles.plantDescription}>{description}</p>
    <p className={styles.plantType}>{type}</p>
  </div>
  );
};

export default DisplayPlant;
