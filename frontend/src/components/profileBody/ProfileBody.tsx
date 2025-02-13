import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextAPi/Auth/useAuthContext";
import { Header } from "../home-coponents/Header/Header";
import { BodyTwo } from "./body2/BodyTwo";
import { HeaderFour } from "./HeaderFour/HeaderFour";
import styles from "./ProfileBody.module.css";
import { Sidebar } from "./sidebar/Sidebar";
import { useEffect } from "react";
export const ProfileBody = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  });

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
