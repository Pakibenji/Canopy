import Header from "@/app/components/Header";
import React from "react";
import styles from "@/app/page.module.css";
import { subTitle } from "@/app/fonts";
import EditUserForm from "@/app/components/Form/EditUserForm";

const EditUserPage = async ({ params }) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/user/${id}`);
  const user = await data.json();

  return (
    <>
      <Header />
      <h2 style={subTitle.style} className={styles.pageTitle}>
        Edit Account
      </h2>
      <EditUserForm user={user}/>
    </>
  );
};

export default EditUserPage;
