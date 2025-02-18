import { useNavigate } from "react-router-dom";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../../contextAPi/ApiResponseContext/useApiContext";
import styles from "./BookNowDiv.module.css";
import { useLocation } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";

export const BookNowDiv = ({ shop }: { shop: shopType }) => {
  const {
    handleContinue,
    formattedTotalPrice,
    subServiceArray,
    // setFormattedTotalPrice,
  } = useApiContext();
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/utility") {
      navigate("/select");
    } else {
      handleContinue();
    }
    // setFormattedTotalPrice("");
  };
  console.log(shop);
  return (
    <div className={styles.bookNow}>
      <span className={styles.spanOne}>
        <small>{subServiceArray.length} service(s)</small>
        <small
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <TbCurrencyNaira size={18} />
          <p>
            {!formattedTotalPrice ? <>{formattedTotalPrice},000</> : <>free</>}
          </p>
        </small>
      </span>
      <span className={styles.spanTwo}>
        <p>23 services available</p>
        <button onClick={handleClick}>Continue</button>
      </span>
    </div>
  );
};
