"use client";
import { signOut } from "next-auth/react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import DisplayUserInfo from "./Display/DisplayUserInfo";
const UserDetail = ({ user }) => {
  const router = useRouter();

  const handleEditUser = async () => {
    router.push(`/dashboard/edit/${user._id}`);
  };
  const handleChangePassword = async () => {
    router.push(`/dashboard/changepassword/${user._id}`);
  };

  return (
    <>
      <DisplayUserInfo name={user.name} email={user.email} userImage={user?.userImage} description={user?.description}/>
      <Button func={handleChangePassword} name="Change Password" />
      <Button func={handleEditUser} name="Edit User" />
      <Button func={signOut} name="Log Out" />
    </>
  );
};

export default UserDetail;
