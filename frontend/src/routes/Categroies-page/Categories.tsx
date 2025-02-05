import { Body } from "../../components/view-products/body/Body";
import { HeaderTwo } from "../../components/view-products/header/HeaderTwo";
import styles from "./Categories.module.css";
export const Categories = () => {
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <Body />
    </div>
  );
};
