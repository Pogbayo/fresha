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
import { useNavigate } from "react-router-dom";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";

export const Header = () => {
  const { handleMenuDropDown, isMenuOpen } = useAppContext();
  const { user, logout } = useAuth();
  const firstLetter = user?.firstname?.charAt(0) || "";
  const navigate = useNavigate();
  const { setActiveComponent } = useApiContext();

  return (
    <div className={styles.container}>
      <h3 className={styles.logo}>Spag </h3>
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
            <li onClick={() => navigate("auth")}>
              <FaSignInAlt /> Log in
            </li>
            <li>
              <FaDownload /> Download the app
            </li>
          </>
        ) : (
          <>
            <li onClick={() => setActiveComponent("deets")}>
              <FaUserCircle /> Profile
            </li>
            <li onClick={() => setActiveComponent("fav")}>
              <FaHeart /> Favourite
            </li>
            <li onClick={() => setActiveComponent("appointment")}>
              <FaCalendarCheck /> Appointment
            </li>
            <li onClick={() => logout()}>
              <FaSignInAlt /> Log out
            </li>
            <li onClick={() => setActiveComponent("deleteaccount")}>
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
