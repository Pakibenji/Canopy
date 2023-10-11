"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FormField from "./FormField";
import styles from "./Form.module.css";
import FormButton from "./FormButton";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import { validatePassword, validateConfirmPassword } from "@/utils/validation";

const ChangePasswordForm = () => {
  const { data: session } = useSession();
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

    const result = await updateUser(session.user.id, {
      password: newPassword,
      oldPassword,
    });
    if (result.error) {
      setFormData({ ...formData, error: result.error, message: "" });
    } else {
      setFormData({
        ...formData,
        message: "Password successfully changed",
        error: "",
      });
    }
  };

  return (
    <form onSubmit={handleChangePassword} className={styles.form}>
      <FormField
        label="Old Password"
        type="oldPassword"
        id="oldPassword"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, oldPassword: value })}
        required={true}
      />
      <FormField
        label="New Password"
        type="newPassword"
        id="newPassword"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, newPassword: value })}
        required={true}
      />
      <FormField
        label="confirm Password"
        type="confirmPassword"
        id="confirmPassword"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
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
