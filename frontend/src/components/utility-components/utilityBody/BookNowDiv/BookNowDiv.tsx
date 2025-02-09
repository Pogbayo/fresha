import { useNavigate } from "react-router-dom";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../../contextAPi/ApiResponseContext/useApiContext";
import styles from "./BookNowDiv.module.css";
import { useLocation } from "react-router-dom";

export const BookNowDiv = ({ shop }: { shop: shopType }) => {
  const { handleContinue } = useApiContext();
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/utility") {
      navigate("/select");
    } else {
      handleContinue();
    }
  };
  return (
    <div className={styles.bookNow}>
      <span className={styles.spanOne}>
        {shop?.name} - {shop?.address[0].city}
      </span>
      <span className={styles.spanTwo}>
        <p>23 services available</p>
        <button onClick={handleClick}>Continue</button>
      </span>
    </div>
  );
};
