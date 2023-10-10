import Header from "@/app/components/Header";
import React from "react";
import styles from "@/app/page.module.css";
import { subTitle } from "@/app/fonts";
import Button from "@/app/components/Button";

const EditUserPage = async () => {

  return <>
    <Header />
    <h2 style={subTitle.style} className={styles.pageTitle}>Edit Account</h2>
  </>;
};

export default EditUserPage;
