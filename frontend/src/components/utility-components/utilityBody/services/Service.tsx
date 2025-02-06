import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import styles from "./service.module.css";
export const Service = ({ shop }: { shop: shopType }) => {
  const service = shop?.services?.map((service) => {
    return service.name;
  });
  return (
    <div>
      <div>
        <h1>Services</h1>
        <div className={styles.serviceHeader}>
          <div>Featured</div>
          <div>{service}</div>
        </div>
      </div>
      <div className={styles.fixed}></div>
    </div>
  );
};
