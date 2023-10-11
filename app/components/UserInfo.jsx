"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleEditUser = async () => {
    router.push(`/dashboard/edit/${session?.user?._id}`);
  }
  const handleChangePassword = async () => {
    router.push(`/dashboard/changepassword`);
  }

  return (
    <>
      <div>
        <h2>{session?.user?.name}</h2>
        <p>{session?.user?.email}</p>
      </div>
      <Button func={handleChangePassword} name="Change Password" />
      <Button func={handleEditUser} name="Edit User" />
      <Button func={signOut} name="Log Out" />
    </>
  );
};

export default UserInfo;
