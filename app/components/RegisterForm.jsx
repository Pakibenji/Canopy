"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function isValid() {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!email.includes("@")) {
      setError("Invalid email");
      return false;
    }
    if (password.length < 7) {
      setError("Password must be at least 7 characters");
      return false;
    }
    if (password === password.toUpperCase()) {
      setError("Password must contain a lowercase character");
      return false;
    }
    if (password === password.toLowerCase()) {
      setError("Password must contain an uppercase character");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
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
          console.log(user);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError("");
          router.push("/");
        } else {
          setError("Something went wrong");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.labelDiv}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.labelDiv}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.labelDiv}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.labelDiv}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Register</button>
        <div className={styles.link}>
          <Link href="/login">go to login page</Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
