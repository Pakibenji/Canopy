import React from "react";
import { PiSpinnerFill } from "react-icons/pi";
import styles from "./IsLoading.module.css";
const IsLoading = () => {
  return (
    <>
      <PiSpinnerFill className={styles.spinner} />
    </>
  );
};

export default IsLoading;
