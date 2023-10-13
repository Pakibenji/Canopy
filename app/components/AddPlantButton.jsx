"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { RiPlantFill } from "react-icons/ri";
import styles from "./AddPlantButton.module.css";
import { useRouter } from "next/navigation";

const AddPlantButton = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  const handleAddPlant = () => {
    router.push("/plants/add");
  };

  return (
    <>
      {session && (
        <button onClick={handleAddPlant} className={styles.addPlant} disabled={isLoading}>
          <RiPlantFill className={styles.icon} />
        </button>
      )}
    </>
  );
};

export default AddPlantButton;