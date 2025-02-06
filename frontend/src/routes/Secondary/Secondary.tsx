import { Body } from "../../components/view-products/body/Body";
import { HeaderTwo } from "../../components/view-products/header/HeaderTwo";
import styles from "./Secondary.module.css";
export const Secondary = () => {
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <Body />
    </div>
  );
};
