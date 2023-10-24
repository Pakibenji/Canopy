import React from "react";
import styles from "@/app/page.module.css";
import { subTitle } from "@/app/fonts";
import EditUserForm from "@/app/components/Form/EditUserForm";
import { getNextServerSession } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { isUserSession } from "@/utils/helpers";

const EditUserPage = async ({ params }) => {
  const { id } = params;
  const data = await fetch(`${process.env.API_URL}/api/user/${id}`);
  const user = await data.json();

  const getSession = await getNextServerSession();
  const sessionUserId = await getSession?.user?._id;

  const isUser = isUserSession(
    sessionUserId,
    id,
    redirect,
    `/dashboard/edit/${sessionUserId}`
  );

  return (
    <>
      <h2 style={subTitle.style} className={styles.pageTitle}>
        Edit Account
      </h2>
      <EditUserForm user={user} />
    </>
  );
};

export default EditUserPage;
