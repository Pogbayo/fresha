import styles from "./Location.module.css";
import { TfiLocationArrow } from "react-icons/tfi";

export const Location = () => {
  return (
    <div className={styles.container}>
      <p>
        <TfiLocationArrow color="lightpurle" size={30} />
      </p>
      <p>Current location</p>
    </div>
  );
};
