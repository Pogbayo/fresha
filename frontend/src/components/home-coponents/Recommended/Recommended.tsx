import styles from "./Recommended.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Loading } from "../../loader/Loading";
import { shopType } from "../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";

export const Recommended = () => {
  const { recommendedCombinedArray, scroll, recommendedRef } = useApiContext();

  return (
    <div className={styles.section}>
      <p className={styles.newHeader}>Trending</p>
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
            <div key={index} className={styles.boxDiv}>
              <img src={shop.images[1]} alt="" />
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
