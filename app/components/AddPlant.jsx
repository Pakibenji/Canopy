"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { RiPlantFill } from "react-icons/ri";
import styles from "./AddPlant.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AddPlant = () => {
  const { data: session} = useSession();
  const router = useRouter();
  const handleAddPlant = () => {
    router.push("/plants/add");
  };

  return (
    <>
      {session && (
        <button onClick={handleAddPlant} className={styles.addPlant}>
          <RiPlantFill  className={styles.icon}/>
        </button>
      )}
    </>
  );
};

export default AddPlant;
