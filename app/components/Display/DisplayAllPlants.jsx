import React from "react";
import styles from "./DisplayAllPlants.module.css";
import { subTitle } from "@/app/fonts";
import Link from "next/link";

const DisplayAllPlants = ({ plant, session }) => {
  const { name, type, plantImage, proprietary, userId } = plant;

  function isUser() {
    if (session?.user?._id === userId) {
      return "My Plant";
    } else {
      return proprietary;
    }
  }

  return (
    <div className={styles.plantContainer}>
      <Link href={`/plants/${plant._id}`}>
        <img className={styles.plantImage} src={plantImage} alt="plantImage" />
        <p className={styles.plantProprietary} style={subTitle.style}>{isUser()}</p>
      </Link>
    </div>
  );
};
export default DisplayAllPlants;
