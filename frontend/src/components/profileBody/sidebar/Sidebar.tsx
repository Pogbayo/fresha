import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import styles from "./Sidebar.module.css";
export const Sidebar = () => {
  const [active, setOnActive] = useState(false);
  return (
    <div className={styles.container}>
      <h3>Name</h3>
      <div
        className={`${styles.liLink} ${active ? styles.active : ""}`}
        onClick={() => setOnActive(true)}
      >
        <CgProfile size={20} />
        Profile
      </div>
      <div
        className={`${styles.liLink} ${active ? styles.active : ""}`}
        onClick={() => setOnActive(true)}
      >
        <TbBrandBooking size={20} />
        Appointments
      </div>
      <div
        className={`${styles.liLink} ${active ? styles.active : ""}`}
        onClick={() => setOnActive(true)}
      >
        <CiHeart size={20} />
        Favourites
      </div>
      <div
        className={`${styles.liLink} ${active ? styles.active : ""}`}
        onClick={() => setOnActive(true)}
      >
        <RiDeleteBin6Fill size={20} />
        Delete account
      </div>
    </div>
  );
};
