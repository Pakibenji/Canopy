'use client';
import { useSession } from "next-auth/react";
import { useState } from "react";
import update

const ChangePasswordForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    message: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      setFormData({
        ...formData,
        error: "Passwords do not match",
        message: "",
      });
      return;
    }
    const result = await updateUser(session.user.id, {
      password: newPassword,
      oldPassword,
    });
    if (result.error) {
      setFormData({ ...formData, error: result.error, message: "" });
    } else {
      setFormData({
        ...formData,
        message: "Password successfully changed",
        error: "",
      });
    }
  };

  return (
    <form onSubmit={handleChangePassword}>
      <label htmlFor="oldPassword">Old Password</label>
      <input
        type="password"
        name="oldPassword"
        id="oldPassword"
        onChange={(e) =>
          setFormData({ ...formData, oldPassword: e.target.value })
        }
      />
      <label htmlFor="newPassword">New Password</label>
      <input
        type="password"
        name="newPassword"
        id="newPassword"
        onChange={(e) =>
          setFormData({ ...formData, newPassword: e.target.value })
        }
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      <button type="submit">Change Password</button>
      {formData.error && <p style={{ color: "red" }}>{formData.error}</p>}
      {formData.message && <p style={{ color: "green" }}>{formData.message}</p>}
    </form>
  );
  
};

export default ChangePasswordForm;