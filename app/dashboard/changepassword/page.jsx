import Header from "@/app/components/Header";
import React from "react";
import styles from "@/app/page.module.css";
import { subTitle } from "@/app/fonts";
import ChangePasswordForm from "@/app/components/Form/ChangePasswordForm";

const ChangePasswordPage = async () => {

  return <>
    <Header />
    <h2 style={subTitle.style} className={styles.pageTitle}>Change Password</h2>
    <ChangePasswordForm />
  </>;
};

export default ChangePasswordPage;