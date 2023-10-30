import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateName = (name) =>
    name.length < 1 || name.length > 30
      ? "Name must be between 1 and 30 characters"
      : null;

  const validateEmail = (email) =>
    email.includes("@") ? null : "Invalid email";

  const validatePassword = (password) =>
    password.length < 7
      ? "Password must be at least 7 characters"
      : password === password.toUpperCase()
      ? "Password must contain a lowercase character"
      : password === password.toLowerCase()
      ? "Password must contain an uppercase character"
      : null;

  const validateConfirmPassword = (password, confirmPassword) =>
    password === confirmPassword ? null : "Passwords do not match";

  const validateDescription = (description) =>
    description.length < 1 || description.length > 100
      ? "Description must be between 1 and 100 characters"
      : null;

  const validateImage = (image) =>
    image ? null : "Please upload an image";

  const validate = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "confirmPassword":
        return validateConfirmPassword(value);
      case "description":
        return validateDescription(value);
      case "image":
        return validateImage(value);
      default:
        return null;
    }
  };

  const validateField = (fieldName, value) => {
    const error = validate(fieldName, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: null,
    }));
  };

  return {
    errors,
    validateField,
    clearFieldError,
  };
};

export default useValidation;