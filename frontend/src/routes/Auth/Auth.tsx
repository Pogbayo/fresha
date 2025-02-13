import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import styles from "./Auth.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (isSignUp && !formData.firstname.trim())
      newErrors.firstname = "First name is required";
    if (isSignUp && !formData.lastname.trim())
      newErrors.lastname = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (isSignUp && !phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(async () => {
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
        console.log(response.data);

        setFormData({ firstname: "", lastname: "", email: "", password: "" });
        setPhone("");
        setErrors({});

        // Show "Registration complete" message
        setSuccessMessage("Registration complete");
        setSuccessful(true);

        setTimeout(() => {
          setSuccessful(false);
          setIsSignUp(false);
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Error submitting form", error);
      }
      setLoading(false);
    }, 2500);
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;
    console.log("Sending data:", formData);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email: formData.email, password: formData.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data);

      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token saved:", token);

          const decodedUser = jwtDecode(token);
          console.log("Decoded user:", decodedUser);
        } else {
          console.error("No token received");
        }

        setFormData({ firstname: "", lastname: "", email: "", password: "" });
        setErrors({});

        setSuccessMessage("Login successful");
        setSuccessful(true);

        setTimeout(() => {
          setSuccessful(false);
          setSuccessMessage("");
          navigate("/profile");
        }, 2500);
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isSignUp) {
              handleSignUp();
            } else {
              handleSignIn();
            }
          }}
        >
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>

          {isSignUp && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  value={formData.firstname}
                />
                {errors.firstname && (
                  <p className={styles.error}>{errors.firstname}</p>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  value={formData.lastname}
                />
                {errors.lastname && (
                  <p className={styles.error}>{errors.lastname}</p>
                )}
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          {isSignUp && (
            <div className={styles.telephone}>
              <label>Phone Number</label>
              <PhoneInput
                country={"us"}
                value={phone}
                onChange={setPhone}
                inputClass={styles.phoneInput}
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
          )}

          <button
            type="submit"
            className={`${styles.btn} ${loading ? styles.loadingBtn : ""}`}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            ) : isSignUp ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </button>

          <p className={styles.toggleText}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              className={styles.toggleBtn}
              onClick={(event) => {
                event.preventDefault();
                setIsSignUp(!isSignUp);
                setErrors({});
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>
        {successful && (
          <p
            className={`${styles.successfulLoginMessage} ${
              successful ? styles.show : ""
            }`}
          >
            {successMessage}
          </p>
        )}
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
