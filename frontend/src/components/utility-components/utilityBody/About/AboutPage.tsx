import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import styles from "./About.module.css";
export const AboutPage = ({ shop }: { shop: shopType }) => {
  return (
    <div className={styles.container}>
      <h1>About</h1>
      <p>{shop?.about}</p>
    </div>
  );
};
