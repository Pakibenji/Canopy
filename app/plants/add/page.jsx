import React from "react";
import PlantForm from "../../components/PlantForm";
import Header from "../../components/Header";
import styles from "../../page.module.css";
import { subTitle } from "../../fonts";

const Plant = () => {
  return (
    <>
    <Header />
    <h2 style={subTitle.style} className={styles.pageTitle}>Add a Plant</h2>
      <PlantForm />
    </>
  );
};

export default Plant;
