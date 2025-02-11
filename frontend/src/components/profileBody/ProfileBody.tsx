import { HeaderThree } from "../utility-components/utilityBody/HeaderThree/HeaderThree";
import styles from "./ProfileBody.module.css";
import { Sidebar } from "./sidebar/Sidebar";
export const ProfileBody = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderThree />
      </div>
      <div className={styles.profileBody}>
        <div className={styles.sideBar}>
          <Sidebar />
        </div>
        <div className={styles.bodyContainer}></div>
      </div>
    </div>
  );
};
