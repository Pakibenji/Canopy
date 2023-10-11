"use client";
import { useState } from "react";
import FormField from "./FormField";
import styles from "./Form.module.css";
import FormButton from "./FormButton";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import { validateName } from "@/utils/validation";
import { useRouter } from "next/navigation";

const EditUserForm = ({ user }) => {
  const { name, userImage, userDescription } = user;
  const [formData, setFormData] = useState({
    name: "",
    userImage: "",
    userDescription: "",
    error: "",
    message: "",
  });
  const router = useRouter();

  const handleChangeName = async (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name || user.name,
      userImage: formData.userImage || user.userImage,
      userDescription: formData.userDescription || user.userDescription,
    };
    try {
      const response = await fetch(`/api/user/edit/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.error) {
        setFormData({ ...formData, error: data.error });
      } else {
        setFormData({
          ...formData,
          message: "User successfully edited!",
          error: "",
        });
        setTimeout(() => {
          router.replace(`/dashboard`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleChangeName} className={styles.form}>
      <FormField
        label="Name"
        type="text"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        required={true}
      />
      <FormField
        label="Image"
        type="text"
        value={formData.userImage}
        onChange={(value) => setFormData({ ...formData, userImage: value })}
      />
      <FormField
        label="Description"
        type="text"
        value={formData.userDescription}
        onChange={(value) =>
          setFormData({ ...formData, userDescription: value })
        }
      />
      <DisplayErrorOrMessage
        error={formData.error}
        message={formData.message}
      />
      <FormButton type="submit" name="Update" />
    </form>
  );
};

export default EditUserForm;
