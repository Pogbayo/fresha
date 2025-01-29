import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { FaChevronUp } from "react-icons/fa";
import { useAppContext } from "../../../contextAPi/useAppContext";

export const Header = () => {
  const { handleMenuDropDown, isMenuOpen } = useAppContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
      <h3 className={styles.logo}>spag {screenWidth}</h3>
      <div className={styles.headerButtons}>
        <button className={styles.buttonOne}>For business</button>
        <button className={styles.buttonTwo} onClick={handleMenuDropDown}>
          Menu
          {isMenuOpen ? <FaChevronUp /> : <FaAngleDown />}
        </button>
        <IoMdMenu
          size={30}
          className={styles.IoMdMenu}
          onClick={handleMenuDropDown}
        />
      </div>

      {
        <ul
          className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}
        >
          <li>Log in</li>
          <li>Download the app</li>
        </ul>
      }
    </div>
  );
};
