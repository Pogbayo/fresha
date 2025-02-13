import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Auth.module.css";
import axios from "axios";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async () => {
    try {
      const userData = { ...formData, phone };
      const response = await axios.post(
        "http://localhost:5000/api/users",
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      setPhone("");
      console.log("Form cleared:", formData, phone);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  useEffect(() => {
    console.log("Form Data Updated:", formData);
  }, [formData]);

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isSignUp) handleSignUp();
          }}
        >
          {isSignUp && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          {isSignUp && (
            <div className={styles.telephone}>
              <label>Phone Number</label>
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputClass={styles.phoneInput}
              />
            </div>
          )}

          <button type="submit" className={styles.btn}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <p className={styles.toggleText}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              className={styles.toggleBtn}
              onClick={(event) => {
                event.preventDefault();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
      </div>
      <div className={styles.imageBox}>
        <img
          src="https://www.fresha.com/assets/_next/static/images/Image1-3df0e155c21a9ca5f2441c251986cf5e.webp"
          alt="Auth"
        />
      </div>
    </div>
  );
};
