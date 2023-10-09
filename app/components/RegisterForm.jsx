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
import DisplayErrorOrMessage from "./DisplayErrorOrMessage";

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
        <div className={styles.labelDiv}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className={styles.labelDiv}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className={styles.labelDiv}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className={styles.labelDiv}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
        <DisplayErrorOrMessage
          error={formData?.error}
          message={formData?.message}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
