import { FaStar } from "react-icons/fa";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../../contextAPi/ApiResponseContext/useApiContext";
import styles from "./ProfileFav.module.css";

export const ProfileFav = () => {
  const { favouritesArray } = useApiContext();

  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".boxDiv");

    boxes.forEach((box, index) => {
      (box as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      box.classList.add("fade-in-active");
    });
  });
  return (
    <div className={styles.section}>
      <p className={styles.newHeader}>Favourites</p>

      <div className={styles.container}>
        {favouritesArray.map((shop: shopType, index: number) => (
          <div
            key={index}
            className={styles.boxDiv}
            style={{ animationDelay: "0.2s" }}
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
