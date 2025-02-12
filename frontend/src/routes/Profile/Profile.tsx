import { ProfileBody } from "../../components/profileBody/ProfileBody";
import styles from "./Profile.module.css";
export const Profile = () => {
  return (
    <div className={styles.container}>
      <ProfileBody />
    </div>
  );
};
