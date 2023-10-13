"use client";
import React from "react";
import styles from "./Form.module.css";
import { plantTypes } from "@/utils/plantTypes";

const FormField = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  required,
}) => {
  function selectInput() {
    return (
      <select
        className={styles.selector}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {plantTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    );
  }

  function standartInput() {
    return (
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...(required && { required: true })}
      />
    );
  }
  function selectInputOrStandartInput(type) {
    if (type === "select") {
      return selectInput();
    }
    if (type === "text" || type === "password" || type === "email") {
      return standartInput();
    }
  }
  return (
    <div className={styles.labelDiv}>
      <label htmlFor={id}>{label}</label>
      {selectInputOrStandartInput(type)}
    </div>
  );
};

export default FormField;
