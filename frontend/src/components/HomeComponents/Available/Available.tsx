import styles from "./Available.module.css";
import { IoLogoApple } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";

export const Available = () => {
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, damping: 10, duration: 0.8 }}
    >
      <div className={styles.container}>
        <div className={styles.boxOne}>
          <span>
            <h3>Available on</h3>
            <IoLogoApple size={30} />
            <FaGoogle size={23} />
          </span>
          <h1>Download the Spag app</h1>
          <p>
            Book unforgettable beauty and wellness experiences with the Spag
            mobile app
          </p>
          <img src="/images/homeMedia/qrCode.png" alt="" />
        </div>
        <div className={styles.boxTwo}>
          <img src="/images/homeMedia/bigImage.png" alt="" />
          <video
            src="/images/homeMedia/freshaVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>
    </motion.div>
  );
};
