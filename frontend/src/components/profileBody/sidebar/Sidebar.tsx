import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems = [
    { id: 0, icon: <CgProfile size={20} />, label: "Profile" },
    { id: 1, icon: <TbBrandBooking size={20} />, label: "Appointments" },
    { id: 2, icon: <CiHeart size={20} />, label: "Favourites" },
    { id: 3, icon: <RiDeleteBin6Fill size={20} />, label: "Delete account" },
  ];

  return (
    <div className={styles.container}>
      <h3>Name</h3>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.liLink} ${
            activeIndex === item.id ? styles.active : ""
          }`}
          style={{
            backgroundColor:
              activeIndex === item.id ? "lightblue" : "transparent",
            transition: "background-color 0.3s ease-in-out",
          }}
          onClick={() => setActiveIndex(item.id)}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
};
