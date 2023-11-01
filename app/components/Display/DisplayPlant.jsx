"use client";
import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../../fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../Button";
import usePlants from "@/utils/usePlants";
import { isProprietary } from "@/utils/helpers";

const DisplayPlant = ({ plant }) => {
  const { name, description, type, proprietary, plantImage } = plant;
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const router = useRouter();
  const { deleteItem: deletePlant } = usePlants("deletePlant");
  const { toggleToBarter } = usePlants();
  const isToBarter = () => plant.toBarter;

  const handleDeletePlant = () => {
    if (isProprietary(userId, plant)) {
      deletePlant(plant._id);
      confirm("Are you sure you want to delete this plant?");
      alert("Plant deleted");
      router.push(`/`);
    } else {
      alert("You are not the owner of this plant");
      return router.push(`/`);
    }
  };

  const handleEditPlant = () => {
    isProprietary(userId, plant) && router.push(`/plants/${plant._id}/edit`);
    if (!isProprietary(userId, plant)) {
      alert("You are not the owner of this plant");
      return router.push(`/`);
    }
  };

  const handleToggleToBarter = () => {
    if (isProprietary(userId, plant)) {
      toggleToBarter(plant, isToBarter());
      alert(
        isToBarter() ? "Plant removed to barter" : "Plant added from barter"
      );
      router.refresh();
    } else {
      alert("You are not the owner of this plant");
      return router.push(`/`);
    }
  };

  return (
    <>
      <div className={styles.plantContainer}>
        <h3 style={subTitle.style} className={styles.plantName}>
          {name}
        </h3>
        <img className={styles.plantImage} src={plantImage} alt={name} />
        <p className={styles.plantDescription}>{description}</p>
        <p className={styles.plantType}>{type}</p>
        <p className={styles.plantProprietary}>{proprietary}</p>
      </div>
      {isProprietary(userId, plant) && (
        <>
          <div className={styles.buttonContainer}>
            <Button func={handleEditPlant} name="Edit" />
            <Button func={handleDeletePlant} name="Delete" />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              func={handleToggleToBarter}
              name={isToBarter() ? "Remove from barter" : "Add to barter"}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DisplayPlant;
