export function validateName(name) {
  if (name.length < 1 || name.length > 30) {
    return "Name must be between 1 and 30 characters";
  }
  return null;
}

export function validateEmail(email) {
  if (!email.includes("@")) {
    return "Invalid email";
  }
  return null;
}

export function validatePassword(password) {
  if (password.length < 7) {
    return "Password must be at least 7 characters";
  }
  if (password === password.toUpperCase()) {
    return "Password must contain a lowercase character";
  }
  if (password === password.toLowerCase()) {
    return "Password must contain an uppercase character";
  }
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return null;
}

export function validateDescription(description) {
  if (description.length < 1 || description.length > 100) {
    return "Description must be between 1 and 100 characters";
  }
  return null;
}

export function validateImage(image) {
  if (!image) {
    return "Please upload an image";
  }
  return null;
}
