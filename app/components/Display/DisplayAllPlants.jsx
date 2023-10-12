import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../../fonts";
import Link from "next/link";

const DisplayAllPlants = ({ plant, session }) => {
  const { name, type, plantImage, proprietary, userId } = plant;

  function isUser() {
    if(session.user._id === userId) {
      return "My Plant"
    } else {
      return proprietary
    }
  }

  return (
    <div className={styles.plantContainer}>
      <h3 style={subTitle.style} className={styles.plantName}>
        {name}
      </h3>
      <img className={styles.plantImage} src={plantImage} alt="plantImage" />
      <p className={styles.plantType}>{type}</p>
      <p className={styles.plantProprietary}>{isUser()}</p>
      <Link href={`/plants/${plant._id}`}>Details</Link>
    </div>
  );
};
export default DisplayAllPlants;
