import styles from "./Favourite.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { shopType } from "../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { useNavigate } from "react-router-dom";

export const Favourite = () => {
  const { scroll, favouritesRef, favouritesArray, setActiveComponent } =
    useApiContext();
  const navigate = useNavigate();

  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={styles.section}>
      {favouritesArray.length > 0 && (
        <p className={styles.newHeader}>Favourites</p>
      )}

      {favouritesArray.length >= 7 && (
        <>
          <button
            className={`${styles.scrollButton} ${styles.leftArrow}`}
            onClick={() => scroll(favouritesRef, "left")}
          >
            <FaAngleLeft size={20} />
          </button>
          <button
            className={`${styles.scrollButton} ${styles.rightArrow}`}
            onClick={() => scroll(favouritesRef, "right")}
          >
            <FaAngleRight size={20} />
          </button>
        </>
      )}

      <div className={styles.container} ref={favouritesRef}>
        {favouritesArray.map((shop: shopType, index: number) => (
          <div
            key={index}
            className={styles.boxDiv}
            onClick={() => {
              navigate("profile");
              setActiveComponent("fav");
            }}
          >
            <img src={shop.images[1]} alt="" />
            <div className={styles.detailBox}>
              <h4 className={styles.shopName}>{shop.name}</h4>
              <p className={styles.rating} style={{ display: "flex", gap: 9 }}>
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
