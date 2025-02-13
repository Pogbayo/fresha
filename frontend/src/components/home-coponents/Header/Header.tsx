import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import {
  FaAngleDown,
  FaChevronUp,
  FaUserCircle,
  FaHeart,
  FaCalendarCheck,
  FaSignInAlt,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useAppContext } from "../../../contextAPi/AppContextApi/useAppContext";
import { useAuth } from "../../../contextAPi/Auth/useAuthContext";
import { IoArrowBackOutline } from "react-icons/io5";

export const Header = () => {
  const { handleMenuDropDown, isMenuOpen } = useAppContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { user } = useAuth();
  const firstLetter = user?.firstname?.charAt(0) || "";

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.logo}>Spag {screenWidth}</h3>
      <div className={styles.headerButtons}>
        <button className={styles.buttonOne}>For business</button>
        <button className={styles.buttonTwo} onClick={handleMenuDropDown}>
          {!user ? "Menu" : <p className={styles.firstLetter}>{firstLetter}</p>}
          {isMenuOpen ? <FaChevronUp /> : <FaAngleDown />}
        </button>
        <IoMdMenu
          size={30}
          className={styles.IoMdMenu}
          onClick={handleMenuDropDown}
        />
      </div>

      <ul className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}>
        <button className={styles.backButton} onClick={handleMenuDropDown}>
          <IoArrowBackOutline />
        </button>
        {!user ? (
          <>
            <li>
              <FaSignInAlt /> Log in
            </li>
            <li>
              <FaDownload /> Download the app
            </li>
          </>
        ) : (
          <>
            <li>
              <FaUserCircle /> Profile
            </li>
            <li>
              <FaHeart /> Favourite
            </li>
            <li>
              <FaCalendarCheck /> Appointment
            </li>
            <li>
              <FaSignInAlt /> Log in
            </li>
            <li>
              <FaTrash /> Delete account
            </li>
            <li>
              <FaDownload /> Download the app
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
