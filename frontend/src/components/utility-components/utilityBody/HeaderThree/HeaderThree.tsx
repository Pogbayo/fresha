import { useRef, useEffect, useState } from "react";
import { CiSearch, CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import styles from "./HeaderThree.module.css";
import { useAppContext } from "../../../../contextAPi/AppContextApi/useAppContext";
import { MyCalendar } from "../../../home-coponents/Book/calendar/MyCalendar";
import { Time } from "../../../home-coponents/Book/Time-picker/Time";
import { Treatment } from "../../../home-coponents/Book/TreatmentDropDown/Treatment";
import { Location } from "../../../home-coponents/Book/location/Location";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contextAPi/Auth/useAuthContext";

export const HeaderThree = () => {
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
    isCalendarOpen,
    isTreatmentsOpen,
    setIsCalendarOpen,
    isCurrentLocation,
    handleTimeDropDown,
    treatmentInputValue,
    calendarInputValue,
    locationInputValue,
  } = useAppContext();
  const { user } = useAuth();
  const firstLetter = user?.firstname.charAt(0);
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
  // console.log(typeof screenWidth);
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
      </form>

      <div className={styles.headerButtons}>
        <button className={styles.buttonTwo} onClick={handleMenuDropDown}>
          {!user ? "Menu" : <p className={styles.firstLetter}>{firstLetter}</p>}
          {isMenuOpen ? <FaChevronUp /> : <FaAngleDown />}
        </button>
      </div>

      <div className={styles.smallScreenHeader}>
        <p
          className={styles.first}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home ·
        </p>
        <p
          className={styles.second}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/secondary")}
        >
          Hair salons ·
        </p>
        <p className={styles.third}>Lagos ·</p>
        <p className={styles.fourth}>TasalaHQ Hair and Beauty</p>
      </div>

      {
        <ul
          className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ""}`}
        >
          <li>Log in</li>
          <li>Download the app</li>
        </ul>
      }

      {
        <div
          ref={treatmentRef}
          className={`${styles.treatmentDropDown} ${
            isTreatmentsOpen ? styles.show : ""
          }`}
        >
          <Treatment handleTreatmentInput={handleTreatmentInput} />
        </div>
      }

      {
        <div
          ref={locationRef}
          className={`${styles.locationDropDown} ${
            isCurrentLocation ? styles.show : ""
          }`}
        >
          <Location handleLocationValueInput={handleLocationValueInput} />
        </div>
      }

      {
        <div
          ref={calendarRef}
          className={`${styles.calendarDropDown} ${
            isCalendarOpen ? styles.show : ""
          }`}
        >
          <MyCalendar handleCalendarValueInput={handleCalendarValueInput} />
        </div>
      }

      {
        <div
          ref={timeRef}
          className={`${styles.timedropdown} ${isTime ? styles.show : ""}`}
        >
          <Time />
        </div>
      }
    </div>
  );
};
