"use client";
import React, { useState } from "react";
import styles from "./Form.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DisplayErrorOrMessage from "./DisplayErrorOrMessage";
import { validateName } from "@/utils/validation";

const PlantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    plantImage: "",
    type: "",
    description: "",
    message: "",
    error: "",
  });

  const { data: session } = useSession();
  const userId = session?.user?._id;
  const proprietary = session?.user?.name;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, plantImage, type, description } = formData;
    const nameError = validateName(name);
    if (nameError) {
      setFormData({ ...formData, error: nameError });
      return;
    }
    try {
      const res = await fetch("/api/plants/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          plantImage,
          type,
          description,
          userId,
          proprietary,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw Error(json.message);
      setFormData({
        ...formData,
        name: "",
        plantImage: "",
        type: "",
        description: "",
        message: "You have successfully added a plant!",
        error: "",
      });
      router.push("/");
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className={styles.labelDiv}>
        <label htmlFor="plantImage">Image</label>
        <input
          type="text"
          id="plantImage"
          value={formData.plantImage}
          onChange={(e) =>
            setFormData({ ...formData, plantImage: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.labelDiv}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.labelDiv}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        />
      </div>
      <DisplayErrorOrMessage
        error={formData?.error}
        message={formData?.message}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default PlantForm;
