"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { RiPlantFill } from "react-icons/ri";
import styles from "./AddPlantButton.module.css";
import { useRouter } from "next/navigation";
import { handleAddPlant } from "@/utils/plantCrud/plantCrudIndex";

const AddPlantButton = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const addPlant = () => {
    handleAddPlant(router);
  };
  return (
    <>
      {session && (
        <button
          className={styles.addPlant}
          onClick={addPlant}
          disabled={isLoading}
        >
          <RiPlantFill className={styles.icon} />
        </button>
      )}
    </>
  );
};

export default AddPlantButton;
