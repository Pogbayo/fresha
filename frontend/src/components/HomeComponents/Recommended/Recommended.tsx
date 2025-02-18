import styles from "./Recommended.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Loading } from "../../loader/Loading";
import { shopType } from "../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Recommended = () => {
  const {
    recommendedCombinedArray,
    scroll,
    recommendedRef,
    addToRecentlyViewedArray,
    displayUtilShop,
  } = useApiContext();
  const [header, setHeader] = useState("");
  const navigate = useNavigate();
  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setTimeout(() => {
      setHeader("Recommended");
    }, 1500);
  });
  const handleDisplayUtilShop = (shop: shopType) => {
    addToRecentlyViewedArray(shop);
    displayUtilShop(shop);
    navigate("/utility");
  };
  return (
    <div className={styles.section}>
      <p className={styles.newHeader}>{header}</p>
      <button
        className={`${styles.scrollButton} ${styles.leftArrow}`}
        onClick={() => scroll(recommendedRef, "left")}
      >
        <FaAngleLeft size={20} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.rightArrow}`}
        onClick={() => scroll(recommendedRef, "right")}
      >
        <FaAngleRight size={20} />
      </button>

      <div className={styles.container} ref={recommendedRef}>
        {recommendedCombinedArray.length === 0 ? (
          <Loading />
        ) : (
          recommendedCombinedArray.map((shop: shopType, index: number) => (
            <div
              key={index}
              className={styles.boxDiv}
              onClick={() => handleDisplayUtilShop(shop)}
            >
              <img src={shop.images[0]} alt="" />
              <div className={styles.detailBox}>
                <h4 className={styles.shopName}>{shop.name}</h4>
                <p
                  className={styles.rating}
                  style={{ display: "flex", gap: 9 }}
                >
                  5.0
                  <FaStar />({getRandomInteger(1, 2000)})
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
