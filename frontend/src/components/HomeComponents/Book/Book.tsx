import styles from "./Book.module.css";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoQrCode } from "react-icons/io5";
import { useRef, useEffect, lazy, Suspense } from "react";
import { useAppContext } from "../../../contextAPi/AppContextApi/useAppContext";
// import { Time } from "./Time-picker/Time";
import { useNavigate } from "react-router-dom";
const MyCalendar = lazy(
  () => import("../../../components/HomeComponents/Book/calendar/MyCalendar")
);
const Time = lazy(
  () => import("../../../components/HomeComponents/Book/Time-picker/Time")
);
const Treatment = lazy(
  () =>
    import(
      "../../../components/HomeComponents/Book/TreatmentDropDown/Treatment"
    )
);
const Location = lazy(
  () => import("../../../components/HomeComponents/Book/location/Location")
);
export const Book = () => {
  const {
    isCalendarOpen,
    handleCalendarDropDown,
    calendarInputValue,
    setCalendarInputValue,
    setIsCalendarOpen,
    isTreatmentsOpen,
    setIsTreatmentsOpen,
    // handleTreatmentsDropDown,
    isTime,
    setIsTime,
    handleTimeDropDown,
    isCurrentLocation,
    setIsCurrentLocation,
    handleCurrentLocationDropDown,
    treatmentInputValue,
    setTreatmentInputValue,
    locationInputValue,

    setLocationInputValue,
  } = useAppContext();
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
            id="treatment"
            placeholder="All Treatments and venues"
            value={treatmentInputValue}
            onClick={() => setIsTreatmentsOpen((prev) => !prev)}
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
            placeholder="Any Date"
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
        <span>
          <button onClick={() => navigate("secondary")}>Search spag</button>
        </span>
      </form>
      <h2 className={styles.kele}>403,834 appointments booked today</h2>
      <button className={styles.qrCodeButton}>
        Get the app
        <IoQrCode />
      </button>
      <Suspense>
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
            // onClick={}
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
      </Suspense>
    </div>
  );
};
