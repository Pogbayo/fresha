import { useState, useEffect } from "react";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { Loading } from "../../loader/Loading";
import styles from "./New.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const New = () => {
  const { jointArray, scroll, containerRef } = useApiContext();
  const [header, setHeader] = useState("");

  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setTimeout(() => {
      setHeader("News");
    }, 1500);
  });

  return (
    <div className={styles.section}>
      <p className={styles.newHeader}>{header}</p>
      <button
        className={`${styles.scrollButton} ${styles.leftArrow}`}
        onClick={() => scroll(containerRef, "left")}
      >
        <FaAngleLeft size={20} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.rightArrow}`}
        onClick={() => scroll(containerRef, "right")}
      >
        <FaAngleRight size={20} />
      </button>

      <div className={styles.container} ref={containerRef}>
        {jointArray.length === 0 ? (
          <Loading />
        ) : (
          jointArray.map((shop, index) => (
            <div key={index} className={styles.boxDiv}>
              <img src={shop.images[0]} alt="" />
              <div className={styles.detailBox}>
                <h4 className={styles.shopName}>{shop.name}</h4>
                <p
                  className={styles.rating}
                  style={{ display: "flex", gap: 9 }}
                >
                  5.0
                  <FaStar />({getRandomInteger(1, 700)})
                </p>
                <h3 className={styles.categoryName}>{shop.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
