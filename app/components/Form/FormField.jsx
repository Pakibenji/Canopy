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
  onSelect,
  placeholder,
  required,
}) => {
  function isSelect(type) {
    if (type === "select") {
      return (
        <select
          className={styles.selector}
          value={value}
          onChange={(e) => onSelect(e.target.value)}
        >
          {console.log(value)}
          {plantTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      );
    }
    if (type === "text" || type === "password") {
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
  }
  return (
    <div className={styles.labelDiv}>
      <label htmlFor={id}>{label}</label>
      {isSelect(type)}
    </div>
  );
};

export default FormField;
