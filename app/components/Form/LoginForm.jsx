"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./Form.module.css";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import { validateEmail, validatePassword } from "@/utils/validation";
import FormButton from "./FormButton";
import FormField from "./FormField";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    message: "",
    error: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError || passwordError) {
      setFormData({ ...formData, error: emailError || passwordError });
      return;
    }
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        setFormData({ ...formData, error: res.error });
        return;
      }
      setFormData({
        ...formData,
        email: "",
        password: "",
        message: "You have successfully logged in!",
        error: "",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <FormField
          label="Email"
          type="email"
          id="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          required={true}
        />
        <FormField
          label="Password"
          type="password"
          id="password"
          value={formData.password}
          onChange={(value) => setFormData({ ...formData, password: value })}
          required={true}
        />
        <DisplayErrorOrMessage
          error={formData?.error}
          message={formData?.message}
        />
        <FormButton type={"submit"} name={"Login"} />
      </form>
    </>
  );
};

export default LoginForm;
