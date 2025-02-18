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
import { useLocation, useNavigate } from "react-router-dom";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { IoHome } from "react-icons/io5";
import { useEffect, useRef } from "react";

export const Header = () => {
  const { handleMenuDropDown, isMenuOpen, setIsMenuOpen } = useAppContext();
  const { user, logout } = useAuth();
  const firstLetter = user?.firstname?.charAt(0) || "";
  const navigate = useNavigate();
  const { setActiveComponent } = useApiContext();
  const location = useLocation();
  const menuRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen((prev) => !prev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.logo} onClick={() => navigate("/")}>
        Spaghetti
      </h3>
      <div className={styles.headerButtons}>
        <button className={styles.buttonOne}>For business</button>
        <button className={styles.buttonTwo} onClick={handleMenuDropDown}>
          {user ? (
            <>
              {!user ? (
                "Menu"
              ) : (
                <p className={styles.firstLetter}>{firstLetter}</p>
              )}
              {isMenuOpen ? <FaChevronUp /> : <FaAngleDown />}
            </>
          ) : (
            <IoMdMenu
              size={30}
              className={styles.IoMdMenu}
              onClick={handleMenuDropDown}
            />
          )}
        </button>
      </div>

      <ul
        // ref={menuRef}
        className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}
      >
        <button className={styles.backButton} onClick={handleMenuDropDown}>
          <IoArrowBackOutline />
        </button>
        {!user ? (
          <>
            <li
              onClick={() => {
                navigate("auth");
                setIsMenuOpen(false);
              }}
            >
              <FaSignInAlt /> Log in
            </li>
            <li>
              <FaDownload /> Download the app
            </li>
          </>
        ) : (
          <>
            {location.pathname !== "/" && (
              <li
                onClick={() => {
                  navigate("/");
                  handleMenuDropDown();
                }}
              >
                <IoHome /> Home
              </li>
            )}

            <li
              onClick={() => {
                setActiveComponent("deets");
                handleMenuDropDown();
                navigate("/profile");
              }}
            >
              <FaUserCircle /> Profile
            </li>
            <li
              onClick={() => {
                setActiveComponent("fav");
                handleMenuDropDown();
                navigate("/profile");
              }}
            >
              <FaHeart /> Favourite
            </li>
            <li
              onClick={() => {
                setActiveComponent("appointment");
                handleMenuDropDown();
                navigate("/profile");
              }}
            >
              <FaCalendarCheck /> Appointment
            </li>
            <li
              onClick={() => {
                logout();
                setIsMenuOpen(false);
                navigate("/");
              }}
            >
              <FaSignInAlt /> Log out
            </li>
            <li
              onClick={() => {
                setActiveComponent("deleteaccount");
                setIsMenuOpen(false);
                navigate("/profile");
              }}
            >
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
