"use client";
import { useState } from "react";
import FormField from "./FormField";
import styles from "./Form.module.css";
import FormButton from "./FormButton";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import { validatePassword, validateConfirmPassword } from "@/utils/validation";
import { useRouter } from "next/navigation";

const ChangePasswordForm = ({ user }) => {
  const { _id } = user;
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    message: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    const oldPasswordError = validatePassword(oldPassword);
    const newPasswordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(
      newPassword,
      confirmPassword
    );
    if (oldPasswordError) {
      setFormData({ ...formData, error: oldPasswordError });
      return;
    }
    if (newPasswordError) {
      setFormData({ ...formData, error: newPasswordError });
      return;
    }
    if (confirmPasswordError) {
      setFormData({ ...formData, error: confirmPasswordError });
      return;
    }
    const data = await fetch(`/api/user/password/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const response = await data.json();
    if (response.error) {
      setFormData({ ...formData, error: response.error });
      return;
    } else {
      setFormData({ ...formData, message: response.message });
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleChangePassword} className={styles.form}>
      <FormField
        label="Old Password"
        type="password"
        id="oldPassword"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, oldPassword: value })}
        required={true}
      />
      <FormField
        label="New Password"
        type="password"
        id="newPassword"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, newPassword: value })}
        required={true}
      />
      <FormField
        label="confirm Password"
        type="password"
        id="confirmPassword"
        value={formData.password}
        onChange={(value) =>
          setFormData({ ...formData, confirmPassword: value })
        }
        required={true}
      />
      <DisplayErrorOrMessage
        error={formData.error}
        message={formData.message}
      />
      <FormButton type="submit" name="Change password" />
    </form>
  );
};

export default ChangePasswordForm;
