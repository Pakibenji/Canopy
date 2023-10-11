"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Form.module.css";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "@/utils/validation";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import FormButton from "./FormButton";
import FormField from "./FormField";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
    error: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    const nameError = validateName(name);
    if (nameError) {
      setFormData({ ...formData, error: nameError });
      return;
    }
    const emailError = validateEmail(email);
    if (emailError) {
      setFormData({ ...formData, error: emailError });
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      setFormData({ ...formData, error: passwordError });
      return;
    }
    const confirmPasswordError = validateConfirmPassword(
      password,
      formData.confirmPassword
    );
    if (confirmPasswordError) {
      setFormData({ ...formData, error: confirmPasswordError });
      return;
    }
    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const user = await resUserExists.json();
      if (user != null) {
        setError("User already exists");
        return;
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const user = await res.json();
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          message: "User created",
          error: "",
        });
        router.push("/login");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField
          label="Name"
          type="text"
          id="name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          required={true}
        />
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
        <FormField
          label="Confirm Password"
          type="password"
          id="confirm-password"
          value={formData.confirmPassword}
          onChange={(value) =>
            setFormData({ ...formData, confirmPassword: value })
          }
          required={true}
        />
        <DisplayErrorOrMessage
          error={formData?.error}
          message={formData?.message}
        />
        <FormButton type={"submit"} name={"Register"} />
      </form>
    </>
  );
};

export default RegisterForm;
