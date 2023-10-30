'use client';
import React from "react";
import PlantForm from "../../components/Form/PlantForm";
import styles from "../../page.module.css";
import { subTitle } from "../../fonts";

const Plant = () => {
  return (
    <>
      <h2 style={subTitle.style} className={styles.pageTitle}>
        Add a Plant
      </h2>
      <PlantForm />
    </>
  );
};

export default Plant;
