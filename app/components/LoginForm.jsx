"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./Form.module.css";
import DisplayErrorOrMessage from "./DisplayErrorOrMessage";
import { validateEmail, validatePassword } from "@/utils/validation";

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
    if (emailError) {
      setFormData({ ...formData, error: emailError });
      return;
    }
    const passwordError = validatePassword(password);
    if (passwordError) {
      setFormData({ ...formData, error: passwordError });
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
        <div className={styles.labelDiv}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
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
            required
          />
        </div>
        <DisplayErrorOrMessage
          error={formData?.error}
          message={formData?.message}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
