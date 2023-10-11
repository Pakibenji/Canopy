import React from "react";
import RegisterForm from "../components/Form/RegisterForm";
import Header from "../components/Header";
import styles from "../page.module.css";
import { subTitle } from "../fonts";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>
        Register
      </h2>
      <RegisterForm />
      <div className="link" style={subTitle.style}>
        <Link href="/login">go to login page</Link>
      </div>
    </>
  );
};

export default Register;
