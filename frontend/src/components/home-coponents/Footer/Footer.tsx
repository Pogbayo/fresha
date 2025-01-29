import styles from "./Footer.module.css";
import { FaGoogle } from "react-icons/fa6";
import { IoLogoApple } from "react-icons/io";
import { CgArrowTopRight } from "react-icons/cg";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstDiv}>
        <div className={styles.one}>
          <p>Spaghetti</p>
          <span>
            Get the app <IoLogoApple size={30} />
            <FaGoogle size={23} />
          </span>
        </div>
        <div className={styles.two}>
          <h1>About Spag</h1>
          <p>Careers</p>
          <p>Customer support</p>
          <p>Blog</p>
          <p>Sitemap</p>
        </div>
        <div className={styles.three}>
          <h1>Legal</h1>
          <p>Privacy policy</p>
          <p>Terms of service</p>
          <p>Terms of use</p>
        </div>
      </div>
      <div className={styles.secondDiv}>
        <div className={styles.one}>
          <h1>For business</h1>
          <p>For partners</p>
          <p>Pricing</p>
          <p>Support</p>
          <p>Status</p>
        </div>
        <div className={styles.two}>
          <h1>FInd us on social</h1>
          <p>
            <CgArrowTopRight />
            Facebook
          </p>
          <p>
            <CgArrowTopRight />
            Twitter
          </p>
          <p>
            <CgArrowTopRight />
            LinkedIn
          </p>
          <p>
            <CgArrowTopRight />
            Instagram
          </p>
        </div>
      </div>
    </div>
  );
};
