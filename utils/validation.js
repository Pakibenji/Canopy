export const validateName = (name) =>
  name.length < 1 || name.length > 30
    ? "Name must be between 1 and 30 characters"
    : null;

export const validateEmail = (email) =>
  email.includes("@") ? null : "Invalid email";

export const validatePassword = (password) =>
  password.length < 7
    ? "Password must be at least 7 characters"
    : password === password.toUpperCase()
    ? "Password must contain a lowercase character"
    : password === password.toLowerCase()
    ? "Password must contain an uppercase character"
    : null;

export const validateConfirmPassword = (password, confirmPassword) =>
  password === confirmPassword ? null : "Passwords do not match";

export const validateDescription = (description) =>
  description.length < 1 || description.length > 100
    ? "Description must be between 1 and 100 characters"
    : null;

export const validateImage = (image) =>
  image ? null : "Please upload an image";
