import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import styles from "./ProductDetails.module.css";
import { IoHeart } from "react-icons/io5";
import { useApiContext } from "../../../../contextAPi/ApiResponseContext/useApiContext";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";

export const ProductDetails = ({ shop }: { shop: shopType }) => {
  const { categoryArray } = useApiContext();
  const categoryname = categoryArray[0]?.name;
  const city = shop?.address?.[0].city;
  const country = shop?.address?.[0].country;
  const shopname = shop?.name;

  const isLiked = false;
  // console.log(utilityShop);
  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div>
      {shop ? (
        <>
          <div className={styles.smallScreenHeader}>
            <p className={styles.first}>Home ·</p>
            <p className={styles.second}>{categoryname} ·</p>
            <p className={styles.third}>{city} ·</p>
            <p className={styles.fourth}>{shopname} </p>
          </div>
          <div className={styles.mainContent}>
            <header>
              <h1>
                {shopname} - {city}
              </h1>
              <div className={styles.divUnderHeader}>
                <div className={styles.one}>
                  <span>
                    <small className={styles.wod}> 5.0</small>
                    <small className={styles.stars}>
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                    </small>
                  </span>
                  <p className={styles.randomNumber} style={{ color: "blue" }}>
                    ({generateRandomNumber(1, 1000)})
                    <small className={styles.dot}> · </small>
                  </p>
                  <p className={styles.openingTime}>
                    Open until
                    {/* {shop.shops?.[0].openingTime.friday || "hold ..."} */}
                    <small className={styles.dot}> · </small>
                  </p>
                  <p className={styles.location}>
                    {city},{country}
                  </p>
                </div>
                <div className={styles.two}>
                  <div className={styles.iconOne}>
                    <IoMdShareAlt />
                  </div>
                  <div className={styles.iconTwo}>
                    {isLiked ? (
                      <CiHeart size={30} />
                    ) : (
                      <IoHeart color="red" size={30} />
                    )}
                  </div>
                </div>
              </div>
            </header>
          </div>
        </>
      ) : (
        <>
          <div className={styles.loading}>
            <div className={styles.one}></div>
            <div className={styles.one}></div>
            <div className={styles.one}></div>
          </div>
        </>
      )}
    </div>
  );
};
