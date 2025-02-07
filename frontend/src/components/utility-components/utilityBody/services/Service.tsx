import { useState, useEffect, useRef } from "react";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import styles from "./service.module.css";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaStar, FaRegClock, FaAngleDown } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import clsx from "clsx";
import { FaAngleUp } from "react-icons/fa";

export const Service = ({ shop }: { shop: shopType }) => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeArray, setActiveArray] = useState<
    shopType["services"][number] | null
  >(null);
  const [isOpeningTimeVisible, setIsOpeningTimeVisible] = useState(false);
  const fixedBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shop?.services?.length) {
      setActiveService(shop.services[0].name);
      setActiveArray(shop.services[0]);
    }
  }, [shop]);

  const services = shop?.services?.map((service) => service.name) || [];

  const handleSetActiveSerice = (item: string, index: number) => {
    setActiveService(item);
    setActiveArray(shop.services[index]);
  };

  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <h1>Services</h1>
        <div className={styles.tagContainer}>
          <div className={styles.miniTags}>
            {services.map((item, index) => (
              <p
                key={index}
                className={activeService === item ? styles.active : ""}
                onClick={() => handleSetActiveSerice(item, index)}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.subServiceContainer}>
          {activeArray?.subServices?.slice(0, 3)?.map((item, index) => {
            return (
              <div key={index} className={styles.subService}>
                <span>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.duration}>{item.duration}</p>
                  <p className={styles.price}>
                    <TbCurrencyNaira />
                    {item.price === 2
                      ? `${item.price}000`
                      : `${item.price},000`}
                  </p>
                </span>
                <button className={styles.bookButton}>Book</button>
              </div>
            );
          })}
        </div>
        <button className={styles.seeMore}>see more</button>
      </div>
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
    </div>
  );
};
