"use client";
import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { useSession } from "next-auth/react";

const PlantForm = () => {
  const [name, setName] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const { data: session} = useSession();
  const userId = session?.user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/plants/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, plantImage, type, userId }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      setName("");
      setPlantImage("");
      setType("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.labelDiv}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.labelDiv}>
        <label htmlFor="plantImage">Image</label>
        <input
          type="text"
          id="plantImage"
          value={plantImage}
          onChange={(e) => setPlantImage(e.target.value)}
          required
        />
      </div>
      <div className={styles.labelDiv}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default PlantForm;
