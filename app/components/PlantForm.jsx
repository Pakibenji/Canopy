"use client";
import React, { useState } from "react";
import styles from "./Form.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DisplayErrorOrMessage from "./DisplayErrorOrMessage";
import { validateName } from "@/utils/validation";
import FormButton from "./FormButton";
import FormField from "./FormField";

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
      <FormField
        label="Name"
        type="text"
        id="name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
        required
      />
      <FormField
        label="Image"
        type="text"
        id="plantImage"
        value={formData.plantImage}
        onChange={(value) => setFormData({ ...formData, plantImage: value })}
        required
      />
      <FormField
        label="Description"
        type="text"
        id="description"
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        required
      />
      <FormField
        label="Type"
        type="text"
        id="type"
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
        required
      />
      <DisplayErrorOrMessage
        error={formData?.error}
        message={formData?.message}
      />
      <FormButton type={"submit"} name={"Add plant"}/>
    </form>
  );
};

export default PlantForm;
