import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../../fonts";
import Link from "next/link";

const DisplayUserPlants = ({ plant }) => {

  const { name, type, plantImage, _id } = plant;
  return (
    <div className={styles.plantContainer}>
      <h3 style={subTitle.style} className={styles.plantName}>{name}</h3>
      <img className={styles.plantImage} src={plantImage} alt={name} />
      <p className={styles.plantType}>{type}</p>
      <Link href={`/plants/${_id}`}>Details</Link>
    </div>
  );
};
export default DisplayUserPlants;
