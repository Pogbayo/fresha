import { Header } from "../home-coponents/Header/Header";
// import { HeaderThree } from "../utility-components/utilityBody/HeaderThree/HeaderThree";
import { BodyTwo } from "./body2/BodyTwo";
import { HeaderFour } from "./HeaderFour/HeaderFour";
import styles from "./ProfileBody.module.css";
import { Sidebar } from "./sidebar/Sidebar";
export const ProfileBody = () => {
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
