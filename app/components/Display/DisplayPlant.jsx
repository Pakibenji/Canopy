"use client";
import React from "react";
import styles from "./DisplayPlants.module.css";
import { subTitle } from "../../fonts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../Button";

const DisplayPlant = ({ plant }) => {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const router = useRouter();

  const isProprietary = () => {
    return userId === plant.userId;
  }

  const handleDeletePlant = async () => {
    if (!isProprietary()) {
      alert("You are not authorized to delete this plant");
      return;
    }
    const { _id } = plant;
    confirm("Are you sure you want to delete this plant?");
    const res = await fetch(`/api/plants/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      alert("Plant deleted successfully");
      router.push("/");
    } else {
      alert("Plant could not be deleted");
    }
  };

  const handleEditPlant = async () => {
    if (!isProprietary()) {
      alert("You are not authorized to edit this plant");
      return;
    }
    const { _id } = plant;
    router.push(`/plants/${_id}/edit`);
  };

  function displayPlantDetail() {
    const { name, description, type, plantImage, proprietary, _id } = plant;
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
  }

  function displayButtons() {
    if (isProprietary()) {
      return (
        <div className={styles.buttonContainer}>
          <Button func={handleDeletePlant} name={"Delete"} />
          <Button func={handleEditPlant} name={"Edit"} />
        </div>
      );
    }
  }

  return (
    <>
      {displayPlantDetail()}
      {displayButtons()}
    </>
  );
};

export default DisplayPlant;
