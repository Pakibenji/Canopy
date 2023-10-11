'use client'
import React from "react";
import styles from "./Form.module.css"

const FormField = ({ label, type, id, value, onChange, placeholder, required }) => {
  return (
    <div className={styles.labelDiv}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...(required && { required: true })
        }
      />
    </div>
  );
};

export default FormField;