import styles from "./Trending.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Loading } from "../../loader/Loading";
import { shopType } from "../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
export const Trending = () => {
  const { trendingCombinedArray, scroll, trendingRef } = useApiContext();

  return (
    <div className={styles.section}>
      <p className={styles.newHeader}>Trending</p>
      <button
        className={`${styles.scrollButton} ${styles.leftArrow}`}
        onClick={() => scroll(trendingRef, "left")}
      >
        <FaAngleLeft size={20} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.rightArrow}`}
        onClick={() => scroll(trendingRef, "right")}
      >
        <FaAngleRight size={20} />
      </button>

      <div className={styles.container} ref={trendingRef}>
        {trendingCombinedArray.length === 0 ? (
          <Loading />
        ) : (
          trendingCombinedArray.map((shop: shopType, index: number) => (
            <div key={index} className={styles.boxDiv}>
              <img src={shop.images[0]} alt="" />
              <div className={styles.detailBox}>
                <h4 className={styles.shopName}>{shop.name}</h4>
                <p className={styles.rating}>
                  5.0
                  <FaStar />
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
