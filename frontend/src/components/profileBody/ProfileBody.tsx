import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../contextAPi/Auth/useAuthContext";
import { Header } from "../home-coponents/Header/Header";
import { BodyTwo } from "./body2/BodyTwo";
import { HeaderFour } from "./HeaderFour/HeaderFour";
import styles from "./ProfileBody.module.css";
import { Sidebar } from "./sidebar/Sidebar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedUserType } from "../../contextAPi/Auth/AuthContext";
export const ProfileBody = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      const decodedUser: DecodedUserType = jwtDecode(token);
      if (decodedUser.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderFour />
      </div>
      <div className={styles.chinaro}>
        <Header />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.sideBar}>
          <Sidebar />
        </div>
        <div className={styles.bodyContainer}>
          <BodyTwo />
        </div>
      </div>
    </div>
  );
};
