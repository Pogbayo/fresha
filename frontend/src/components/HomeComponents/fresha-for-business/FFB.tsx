import styles from "./FFB.module.css";
import { FaStar } from "react-icons/fa";

export const FFB = () => {
  return (
    <div className={styles.container}>
      <div className={styles.divOne}>
        <h1>Spaghetti for Business</h1>
        <p>
          Supercharge your business for free with the world's top booking
          platform for salons and spas.Independently voted no.1 by industry
          professionals.
        </p>
        <button>Find out more</button>
        <p>Excellent</p>
        <span>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </span>
      </div>
      <div className={styles.divTwo}>
        <img
          src="https://www.fresha.com/assets/_next/static/images/forBusinessLarge@2x-fd57ffd8d49b52a5aa5ec21790fc4164.webp"
          alt=""
          className={styles.img}
        />
      </div>
    </div>
  );
};
