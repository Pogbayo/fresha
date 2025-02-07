import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import styles from "./Image.module.css";
export const ImageContainer = ({ shop }: { shop: shopType }) => {
  return (
    <div className="app">
      <div className={styles.imgContainer}>
        <img
          src={shop?.images[0]}
          alt=""
          className={shop ? styles.imgOne : styles.loading}
        />
        <img
          src={shop?.images[1]}
          alt=""
          className={shop ? styles.imgTwo : styles.loading}
        />
      </div>
    </div>
  );
};
