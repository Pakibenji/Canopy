import React from "react";
import styles from "./DisplayAllPlants.module.css";
import { subTitle } from "@/app/fonts";
import Link from "next/link";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const DisplayAllPlants = ({ plant, session }) => {
  const { plantImage, proprietary, userId, toBarter } = plant;

  const isUser = () => {
    if (session?.user?._id === userId) {
      return "My Plant";
    }
    return proprietary;
  };

  const isBarter = () => {
    if (toBarter) return <RiCheckboxBlankCircleFill />;
  };

  return (
    <div className={styles.plantContainer}>
      <Link href={`/plants/${plant._id}`}>
        <img className={styles.plantImage} src={plantImage} alt="plantImage" />
      </Link>
      <div className={styles.bartAndProprietary}>
        <p className={styles.plantProprietary} style={subTitle.style}>
          {isUser()}
        </p>
        <div className={styles.barter}>{isBarter()}</div>
      </div>
    </div>
  );
};
export default DisplayAllPlants;
