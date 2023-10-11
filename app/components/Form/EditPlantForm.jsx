"use client";
import styles from "./Form.module.css";
import React, { useState } from "react";
import FormButton from "./FormButton";
import FormField from "./FormField";
import DisplayErrorOrMessage from "../Display/DisplayErrorOrMessage";
import { useRouter } from "next/navigation";

const EditPlantForm = ({ plant }) => {
  const { name, plantImage, type, description } = plant;
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    plantImage: "",
    type: "",
    description: "",
    error: "",
    message: "",
  });
  const router = useRouter();

  const handleEditPlant = async (e) => {
    e.preventDefault();
    const plantData = {
      name: updateFormData.name || plant.name,
      plantImage: updateFormData.plantImage || plant.plantImage,
      type: updateFormData.type || plant.type,
      description: updateFormData.description || plant.description,
    };
    try {
      const response = await fetch(`/api/plants/edit/${plant._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plantData),
      });
      const data = await response.json();
      if (data.error) {
        setUpdateFormData({ ...updateFormData, error: data.error });
      } else {
        setUpdateFormData({
          ...updateFormData,
          message: "Plant successfully edited!",
          error: "",
        });
        setTimeout(() => {
          router.replace(`/plants/${plant._id}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" className={styles.form} onSubmit={handleEditPlant}>
      <FormField
        label="Name"
        type="text"
        id="name"
        placeholder={name}
        value={updateFormData.name}
        onChange={(value) =>
          setUpdateFormData({ ...updateFormData, name: value })
        }
        required={true}
      />
      <FormField
        label="Image"
        type="text"
        id="plantImage"
        placeholder={plantImage}
        value={updateFormData.plantImage}
        onChange={(value) =>
          setUpdateFormData({ ...updateFormData, plantImage: value })
        }
        required={true}
      />
      <FormField
        label="Description"
        type="text"
        id="description"
        placeholder={description}
        value={updateFormData.description}
        onChange={(value) =>
          setUpdateFormData({ ...updateFormData, description: value })
        }
        required={true}
      />
      <FormField
        label="Type"
        type="text"
        id="type"
        placeholder={type}
        value={updateFormData.type}
        onChange={(value) =>
          setUpdateFormData({ ...updateFormData, type: value })
        }
        required={true}
      />
      <DisplayErrorOrMessage
        error={updateFormData?.error}
        message={updateFormData?.message}
      />
      <FormButton type={"submit"} name={"Edit Plant"} />
    </form>
  );
};

export default EditPlantForm;
