import styles from "./Available.module.css";
import { IoLogoApple } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";

export const Available = () => {
  return (
    <div className={styles.container}>
      <div className={styles.boxOne}>
        <span>
          <h3>Available on</h3>
          <IoLogoApple size={30} />
          <FaGoogle size={23} />
        </span>
        <h1>Download the Spag app</h1>
        <p>
          Book unforgettable beauty and wellness experiences with the Fresha
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
          onCanPlay={() => console.log("Video can play")}
          onError={() => console.log("Error loading video")}
        />
      </div>
    </div>
  );
};
