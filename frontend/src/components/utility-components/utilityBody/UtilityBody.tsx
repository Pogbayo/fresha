import { HeaderThree } from "./HeaderThree/HeaderThree";
import { ProductDetails } from "./products-details/ProductDetails";
import { ImageContainer } from "./ImageContainer/ImageComponent";
import styles from "./utilityBody.module.css";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import { Service } from "./services/Service";
import { Team } from "./Team/Team";

export const UtilityBody = () => {
  const { categoryArray } = useApiContext();
  const shopsFromCategoryOne = categoryArray?.[3]?.shops;
  const shopFromShopOne = shopsFromCategoryOne?.[0];

  // console.log(shopFromShopOne);

  return (
    <div className={styles.App}>
      <HeaderThree />
      <ProductDetails shop={shopFromShopOne} />
      <ImageContainer shop={shopFromShopOne} />
      <Service shop={shopFromShopOne} />
      <Team shop={shopFromShopOne} />
    </div>
  );
};
