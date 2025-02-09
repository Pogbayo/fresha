import { FaStar, FaRegClock, FaAngleDown } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import clsx from "clsx";
import { FaAngleUp } from "react-icons/fa";
import { useRef, useState } from "react";
import styles from "./sticky.module.css";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";

export const Sticky = ({ shop }: { shop: shopType }) => {
  const [isOpeningTimeVisible, setIsOpeningTimeVisible] = useState(false);
  const fixedBoxRef = useRef<HTMLDivElement | null>(null);
  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <div ref={fixedBoxRef} className={styles.fixedBox}>
      <div className={styles.upperDiv}>
        <h1 className={styles.name}>
          {shop?.name} - {shop?.address[0].city}
        </h1>
        <div className={styles.rating}>
          <p>5.0</p>
          <span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </span>
          <p style={{ color: "blue" }}>({generateRandomNumber(400, 1000)})</p>
        </div>
        <p className={styles.dealsButton}>Deals</p>
        <button>Book now</button>
      </div>
      <div className={styles.lowerDiv}>
        <span>
          <p>
            <FaRegClock />
          </p>
          <p>Open until 18:00</p>
          <p
            onClick={() => setIsOpeningTimeVisible(!isOpeningTimeVisible)}
            className={styles.toggleIcon}
          >
            {isOpeningTimeVisible ? <FaAngleUp /> : <FaAngleDown />}
          </p>
        </span>
        <div
          className={clsx(styles.openingTimesContainer, {
            [styles.visible]: isOpeningTimeVisible,
          })}
        >
          {Object.entries(shop?.openingTimes || {}).map(([day, time]) => (
            <p
              key={day}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <GoDotFill
                color={day.toLowerCase() === "sunday" ? "gray" : "blue"}
              />
              <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
              <span style={{ marginLeft: "8px" }}>{time}</span>
            </p>
          ))}
        </div>
        <span>
          <p>
            <CiLocationArrow1 />
          </p>
          <p>
            {shop?.address?.[0].street}, {shop?.address?.[0].city}
          </p>
        </span>
      </div>
    </div>
  );
};
