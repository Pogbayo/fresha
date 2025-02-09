import { HeaderThree } from "./HeaderThree/HeaderThree";
import { ProductDetails } from "./products-details/ProductDetails";
import { ImageContainer } from "./ImageContainer/ImageComponent";
import styles from "./utilityBody.module.css";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { Service } from "./services/Service";
import { Team } from "./Team/Team";
import { AboutPage } from "./About/AboutPage";
import { Sticky } from "./sticky/Sticky";
import { BookNowDiv } from "./BookNowDiv/BookNowDiv";
import { OpeningTime } from "./OpeningTime/OpeningTime";
import { useEffect, useState } from "react";

export const UtilityBody = () => {
  const { categoryArray } = useApiContext();
  const shopsFromCategoryOne = categoryArray?.[4]?.shops;
  const shopFromShopOne = shopsFromCategoryOne?.[1];
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryArray?.length > 0) {
      setIsLoading(false);
    }
  }, [categoryArray]);
  console.log(shopFromShopOne);
  return (
    <div className={styles.App}>
      <HeaderThree />
      <div className={styles.upperDiv}>
        {!loading ? (
          <>
            <ProductDetails shop={shopFromShopOne} />
            <ImageContainer shop={shopFromShopOne} />
          </>
        ) : (
          <div className={styles.loaderContainer}>
            <div className={styles.one}>
              <span className={styles.spanOne}></span>
              <span className={styles.spanTwo}></span>
            </div>
            <div className={styles.two}></div>
            <div className={styles.three}></div>
          </div>
        )}
      </div>

      {!loading && (
        <>
          <div className={styles.lowerDiv}>
            <div className={styles.firstDiv}>
              <Service shop={shopFromShopOne} />
              <Team shop={shopFromShopOne} />
              <AboutPage shop={shopFromShopOne} />
              <OpeningTime shop={shopFromShopOne} />
            </div>
            <div className={styles.secondDiv}>
              <Sticky shop={shopFromShopOne} />
            </div>
          </div>
          <BookNowDiv shop={shopFromShopOne} />
        </>
      )}
    </div>
  );
};
