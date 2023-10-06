"use client";
import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PlantForm = () => {
  const [name, setName] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const proprietary = session?.user?.name;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPlant()) return;
    try {
      const res = await fetch("/api/plants/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, plantImage, type, userId, proprietary }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      setName("");
      setPlantImage("");
      setType("");
      setError("");
      setMessage("Your plant has been added!");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  function isValidPlant() {
    if (name.length < 1 && name.length > 30) {
      setError("Name must be between 1 and 30 characters");
      return false;
    }
    if (description.length < 1 && description.length > 100) {
      setError("Description must be between 1 and 100 characters");
      return false;
    }
  }

  function displayErrorOrMessage() {
    if (error) return <div className="error">{error}</div>;
    if (message) return <div className="message">{message}</div>;
  }

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
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      <button type="submit">Add Plant</button>
      {displayErrorOrMessage()}
    </form>
  );
};

export default PlantForm;
