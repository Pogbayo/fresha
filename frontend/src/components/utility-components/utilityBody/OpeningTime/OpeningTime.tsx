import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import { GoDotFill } from "react-icons/go";
import styles from "./OpeningTime.module.css";
export const OpeningTime = ({ shop }: { shop: shopType }) => {
  return (
    <div className={styles.container}>
      <h1>Opening TImes</h1>
      {Object.entries(shop?.openingTimes || {}).map(([day, time]) => (
        <p
          key={day}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <GoDotFill
            color={day.toLowerCase() === "sunday" ? "lightgray" : "lightgreen"}
          />
          <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong>
          <span style={{ marginLeft: "8px" }}>{time}</span>
        </p>
      ))}
    </div>
  );
};
