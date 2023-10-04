import React from "react";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import styles from "../page.module.css";
import { subTitle } from "../fonts";

const Register = () => {
  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>
        Register
      </h2>
      <RegisterForm />
    </>
  );
};

export default Register;
