import styles from "./RecentlyViewed.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import { shopType } from "../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { useNavigate } from "react-router-dom";
import { shopType } from "../../../contextAPi/ApiResponseContext/ApiContext";

export const RecentlyViewed = () => {
  const { recentlyArray, scroll, recentlyRef, displayUtilShop } =
    useApiContext();
  const navigate = useNavigate();
  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleDisplayUtility = (shop: shopType) => {
    displayUtilShop(shop);
    navigate("/utility");
  };

  return (
    <div className={styles.section}>
      {recentlyArray.length > 0 && (
        <p className={styles.newHeader}>Recently Viewed</p>
      )}

      {recentlyArray.length >= 7 && (
        <>
          <button
            className={`${styles.scrollButton} ${styles.leftArrow}`}
            onClick={() => scroll(recentlyRef, "left")}
          >
            <FaAngleLeft size={20} />
          </button>
          <button
            className={`${styles.scrollButton} ${styles.rightArrow}`}
            onClick={() => scroll(recentlyRef, "right")}
          >
            <FaAngleRight size={20} />
          </button>
        </>
      )}
      <div className={styles.container}>
        {Array.isArray(recentlyArray) &&
          recentlyArray.slice(0.5).map((shop, index) => (
            <div
              key={index}
              className={styles.boxDiv}
              onClick={() => {
                handleDisplayUtility(shop);
              }}
            >
              <img src={shop.images[1]} alt="" />
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
          ))}
      </div>
    </div>
  );
};
