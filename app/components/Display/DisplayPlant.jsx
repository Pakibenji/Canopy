'use client';
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

  const isProprietary = () => userId === plant.userId;
  const isToBarter = () => plant.toBarter;

  const deletePlant = async () => {
    if (!isProprietary()) {
      alert("You are not authorized to delete this plant");
      return;
    }
    const { _id } = plant;
    if (confirm("Are you sure you want to delete this plant?")) {
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
    }
  };

  const editPlant = () => {
    if (!isProprietary()) {
      alert("You are not authorized to edit this plant");
      return;
    }
    const { _id } = plant;
    router.push(`/plants/${_id}/edit`);
  };

  const toggleToBarter = async () => {
    if (!isProprietary()) {
      alert("You are not authorized to edit this plant");
      return;
    }
    const { _id } = plant;
    const res = await fetch(`/api/plants/edit/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ toBarter: !isToBarter() }),
    });
    if (res.status === 200) {
      alert("Plant edited successfully");
      router.push("/");
    } else {
      alert("Plant could not be edited");
    }
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
    return (
      <Button
        func={func}
        name={name}
      />
    );
  };

  const displayButtons = () => {
    return isProprietary() && (
      <div className={styles.buttonContainer}>
        {displayButton(deletePlant, "Delete")}
        {displayButton(editPlant, "Edit")}
      </div>
    );
  };

  const displayToBarterButton = () => {
    return isProprietary() && (
      <div className={styles.buttonContainer}>
        {displayButton(toggleToBarter, isToBarter() ? "Remove from barter" : "Add to barter")}
      </div>
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