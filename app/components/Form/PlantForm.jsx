"use client";
import React, { useState, useContext } from "react";
import styles from "./Form.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import { validateName } from "@/utils/validation";
import FormButton from "./FormButton";
import FormField from "./FormField";
import usePlants from "@/utils/usePlants";
import useGeolocation from "@/utils/useGeolocation";
const PlantForm = () => {
  const { data: session } = useSession();
  const userId = session?.user?._id;
  const proprietary = session?.user?.name;
  const router = useRouter();
  const {city }  = useGeolocation();
  const [formData, setFormData] = useState({
    name: "",
    plantImage: "",
    type: "",
    description: "",
    message: "",
    error: "",
  });
  const create = usePlants();
  console.log(city)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, plantImage, type, description } = formData;
    const nameError = validateName(name);
    if (nameError) {
      setFormData({ ...formData, error: nameError });
      return;
    }
    try {
      await create("createPlant").createPlant({
        name,
        plantImage,
        type,
        description,
        city,
        userId,
        proprietary,
      });
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
        required={true}
      />
      <FormField
        label="Image"
        type="text"
        id="plantImage"
        value={formData.plantImage}
        onChange={(value) => setFormData({ ...formData, plantImage: value })}
        required={true}
      />
      <FormField
        label="Description"
        type="text"
        id="description"
        value={formData.description}
        onChange={(value) => setFormData({ ...formData, description: value })}
        required={true}
      />
      <FormField
        label="Type"
        type="select"
        id="plantType"
        name="plantType"
        value={formData.type}
        onChange={(value) => setFormData({ ...formData, type: value })}
      />
      <DisplayErrorOrMessage
        error={formData?.error || create.error}
        message={formData?.message || create.message}
      />
      <FormButton type={"submit"} name={"Add plant"} />
    </form>
  );
};

export default PlantForm;
