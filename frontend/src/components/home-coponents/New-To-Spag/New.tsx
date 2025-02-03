import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { Loading } from "../../loader/Loading";
import styles from "./New.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export const New = () => {
  const { jointArray, scroll, containerRef } = useApiContext();

  return (
    <div className={styles.section}>
      <p className={styles.newHeader}>New to Spag</p>
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
