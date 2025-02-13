import { useState } from "react";
import styles from "./DeleteAccount.module.css";
import { useNavigate } from "react-router-dom";

export const DeleteAccount = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "appplication/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Delete Account</h2>
      <p className={styles.warningText}>
        This action is <strong>irreversible</strong>. Your data will be lost
        forever, and you will not be able to recover it.
      </p>

      {isConfirming ? (
        <div className={styles.confirmBox}>
          <p className={styles.dangerText}>
            Are you sure you want to delete your account?
          </p>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            Yes, Delete
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setIsConfirming(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className={styles.deleteTrigger}
          onClick={() => setIsConfirming(true)}
        >
          Delete My Account
        </button>
      )}
    </div>
  );
};
