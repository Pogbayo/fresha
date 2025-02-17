import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import styles from "./HeaderTwo.module.css";
import { useAppContext } from "../../../contextAPi/AppContextApi/useAppContext";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../../../contextAPi/Auth/useAuthContext";
import {
  FaUserCircle,
  FaHeart,
  FaCalendarCheck,
  FaSignInAlt,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";

//Lazy loaading components
const MyCalendar = lazy(
  () => import("../../home-coponents/Book/calendar/MyCalendar")
);
const Time = lazy(
  () => import("../../../components/home-coponents/Book/Time-picker/Time")
);
const Treatment = lazy(
  () => import("../../home-coponents/Book/TreatmentDropDown/Treatment")
);
const Location = lazy(
  () => import("../../home-coponents/Book/location/Location")
);

export const HeaderTwo = () => {
  const {
    handleCurrentLocationDropDown,
    handleTreatmentsDropDown,
    handleCalendarDropDown,
    setTreatmentInputValue,
    setCalendarInputValue,
    setLocationInputValue,
    setIsCurrentLocation,
    setIsTreatmentsOpen,
    handleMenuDropDown,
    isTime,
    setIsTime,
    isMenuOpen,
    setIsMenuOpen,
    isCalendarOpen,
    isTreatmentsOpen,
    setIsCalendarOpen,
    isCurrentLocation,
    handleTimeDropDown,
    treatmentInputValue,
    calendarInputValue,
    locationInputValue,
  } = useAppContext();
  const { user, logout } = useAuth();
  const firstLetter = user?.firstname?.charAt(0) || "";
  const { setActiveComponent } = useApiContext();
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const treatmentRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const handleTreatmentInput = (value: string) => {
    setTreatmentInputValue(value);
    setIsTreatmentsOpen(false);
  };
  const handleLocationValueInput = (value: string) => {
    setLocationInputValue(value);
    setIsCurrentLocation(false);
  };
  const handleCalendarValueInput = (value: string) => {
    setCalendarInputValue(value);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(typeof screenWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }

      if (
        treatmentRef.current &&
        !treatmentRef.current.contains(event.target as Node)
      ) {
        setIsTreatmentsOpen(false);
      }
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsCurrentLocation(false);
      }
      if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
        setIsTime(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      window.removeEventListener("resize", handleResize);
    };
  }, [setIsCalendarOpen, setIsTreatmentsOpen, setIsTime, setIsCurrentLocation]);

  return (
    <div className={styles.container}>
      <h3 className={styles.logo} onClick={() => navigate("/")}>
        spag
      </h3>
      <form action="" className={styles.formContainer}>
        <span>
          <CiSearch size={23} />
          <input
            type="text"
            id="treatment"
            placeholder="All Treatments and venues"
            value={treatmentInputValue}
            onClick={handleTreatmentsDropDown}
            onChange={(e) => setTreatmentInputValue(e.target.value)}
          />
        </span>

        <span>
          <CiLocationOn />
          <input
            type="text"
            id="location"
            placeholder="Current location"
            onChange={(e) => setLocationInputValue(e.target.value)}
            value={locationInputValue}
            onClick={handleCurrentLocationDropDown}
          />
        </span>
        <span>
          <MdDateRange />
          <input
            type="text"
            placeholder={screenWidth.toString()}
            id="date"
            value={calendarInputValue}
            onClick={handleCalendarDropDown}
            onChange={(e) => setCalendarInputValue(e.target.value)}
          />
        </span>
        <span>
          <IoTimeOutline />
          <input
            type="text"
            placeholder="Any time"
            onClick={handleTimeDropDown}
            id="time"
            onChange={(e) => setCalendarInputValue(e.target.value)}
          />
        </span>

        {/* <span>
          <button>S</button>
        </span> */}
      </form>

      <div className={styles.headerButtons}>
        <button className={styles.buttonTwo} onClick={handleMenuDropDown}>
          {!user ? "Menu" : <p className={styles.firstLetter}>{firstLetter}</p>}
          {isMenuOpen ? <FaChevronUp /> : <FaAngleDown />}
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
                handleMenuDropDown();
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

      <div className={styles.smallScreenHeader}>
        <div className={styles.iconContainer}>
          <GoArrowLeft size={30} onClick={() => navigate("/")} />
        </div>
        <div className={styles.textContainer}>
          <p>All treatments and venues</p>
          <span>
            <p>Any date</p> · <p>Map area</p>
          </span>
        </div>
        <div className={styles.locationIcon}>
          <GrMapLocation size={20} />
        </div>
      </div>

      <Suspense>
        {isTreatmentsOpen && (
          <div
            ref={treatmentRef}
            className={`${styles.treatmentDropDown} ${styles.show}`}
          >
            <Treatment handleTreatmentInput={handleTreatmentInput} />
          </div>
        )}
        {isCurrentLocation && (
          <div
            ref={locationRef}
            className={`${styles.locationDropDown} ${styles.show}`}
          >
            <Location handleLocationValueInput={handleLocationValueInput} />
          </div>
        )}
        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className={`${styles.calendarDropDown} ${styles.show}`}
          >
            <MyCalendar handleCalendarValueInput={handleCalendarValueInput} />
          </div>
        )}
        {isTime && (
          <div
            ref={timeRef}
            className={`${styles.timedropdown} ${styles.show}`}
          >
            <Time />
          </div>
        )}
      </Suspense>
    </div>
  );
};
