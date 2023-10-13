import Header from "@/app/components/Header";
import React from "react";
import styles from "@/app/page.module.css";
import { subTitle } from "@/app/fonts";
import ChangePasswordForm from "@/app/components/Form/ChangePasswordForm";
import { getNextServerSession } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { isUserSession } from "@/utils/helpers";

const ChangePasswordPage = async ({params}) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/user/${id}`);
  const user = await data.json();

  const getSession = await getNextServerSession();
  const sessionUserId = await getSession?.user?._id;

  const isUser = isUserSession(sessionUserId, id, redirect, `/dashboard/${sessionUserId}`);

  return <>
    <Header />
    <h2 style={subTitle.style} className={styles.pageTitle}>Change Password</h2>
    <ChangePasswordForm  user={user}/>
  </>;
};

export default ChangePasswordPage;