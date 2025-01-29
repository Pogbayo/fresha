import styles from "./Book.module.css";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoQrCode } from "react-icons/io5";
import { useAppContext } from "../../../contextAPi/useAppContext";
import { MyCalendar } from "./calendar/MyCalendar";
import { useRef, useEffect } from "react";
import { Treatment } from "./TreatmentDropDown/Treatment";
import { Location } from "./location/Location";
import { Time } from "./TIme-picker/TIme";

export const Book = () => {
  const {
    isCalendarOpen,
    setIsCalendarOpen,
    handleCalendarDropDown,
    isTreatmentsOpen,
    setIsTreatmentsOpen,
    handleTreatmentsDropDown,
    isTime,
    setIsTime,
    handleTimeDropDown,
    isCurrentLocation,
    setIsCurrentLocation,
    handleCurrentLocationDropDown,
  } = useAppContext();
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const treatmentRef = useRef<HTMLDivElement | null>(null);
  const locationRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
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
    };
  }, [setIsCalendarOpen, setIsTreatmentsOpen, setIsTime, setIsCurrentLocation]);
  return (
    <div className={styles.container}>
      <h1 className={styles.bigFont}>
        Book local beauty and wellness services
      </h1>
      <form action="" className={styles.formContainer}>
        <span>
          <CiSearch size={20} />
          <input
            type="text"
            placeholder="All Treatments and venues"
            onClick={handleTreatmentsDropDown}
          />
        </span>

        <span>
          <CiLocationOn />
          <input
            type="text"
            placeholder="Current location"
            onClick={handleCurrentLocationDropDown}
          />
        </span>
        <span>
          <MdDateRange />
          <input
            type="text"
            placeholder="Any Date"
            onClick={handleCalendarDropDown}
          />
        </span>
        <span>
          <IoTimeOutline />
          <input
            type="text"
            placeholder="Any time"
            onClick={handleTimeDropDown}
          />
        </span>
        <span>
          <button>Search spag</button>
        </span>
      </form>
      <h2>403,834 appointments booked today</h2>
      <button className={styles.qrCodeButton}>
        Get the app
        <IoQrCode />
      </button>
      {isTreatmentsOpen && (
        <div ref={treatmentRef} className={styles.TreatmentDropDown}>
          <Treatment />
        </div>
      )}
      {isCurrentLocation && (
        <div ref={locationRef} className={styles.locationDropDown}>
          <Location />
        </div>
      )}
      {isCalendarOpen && (
        <div ref={calendarRef} className={styles.calendarDropDown}>
          <MyCalendar />
        </div>
      )}
      {isTime && (
        <div ref={timeRef} className={styles.timeDropDown}>
          <Time />
        </div>
      )}
    </div>
  );
};
