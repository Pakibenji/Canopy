"use client";
import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../../fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../Button";
import usePlants from "@/utils/usePlants";

const DisplayPlant = ({ plant }) => {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const router = useRouter();
  const { deleteItem: deletePlant } = usePlants("deletePlant");

  const isProprietary = () => userId === plant.userId;
  const isToBarter = () => plant.toBarter;

  const handleDeletePlant = () => {
    if (!isProprietary()) {
      alert("You are not authorized to delete this plant");
      return;
    }
    deletePlant(plant._id);
    alert("Plant deleted");
    router.push("/");
  };

  const handleEditPlant = () => {
    if (!isProprietary()) {
      alert("You are not authorized to edit this plant");
      return;
    }
    handleToEditPlantPage(plant, router);
  };

  const handleToggleToBarter = () => {
    if (!isProprietary()) {
      alert("You are not authorized to edit this plant");
      return;
    }
    toggleToBarter(plant, isToBarter(), router);
  };

  const displayPlantDetail = () => {
    const { name, description, type, plantImage, proprietary } = plant;
    return (
      <div className={styles.plantContainer}>
        <h3 style={subTitle.style} className={styles.plantName}>
          {name}
        </h3>
        <img className={styles.plantImage} src={plantImage} alt={name} />
        <p className={styles.plantDescription}>{description}</p>
        <p className={styles.plantType}>{type}</p>
        <p className={styles.plantProprietary}>{proprietary}</p>
      </div>
    );
  };

  const displayButton = (func, name) => {
    return <Button func={func} name={name} />;
  };

  const displayButtons = () => {
    return (
      isProprietary() && (
        <div className={styles.buttonContainer}>
          {displayButton(handleDeletePlant, "Delete")}
          {displayButton(handleEditPlant, "Edit")}
        </div>
      )
    );
  };

  const displayToBarterButton = () => {
    return (
      isProprietary() && (
        <div className={styles.buttonContainer}>
          {displayButton(
            handleToggleToBarter,
            isToBarter() ? "Remove from barter" : "Add to barter"
          )}
        </div>
      )
    );
  };

  return (
    <>
      {displayPlantDetail()}
      {displayButtons()}
      {displayToBarterButton()}
    </>
  );
};

export default DisplayPlant;
