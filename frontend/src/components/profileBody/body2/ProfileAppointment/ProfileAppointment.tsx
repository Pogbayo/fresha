import { FaStar } from "react-icons/fa";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../../contextAPi/ApiResponseContext/useApiContext";
import styles from "./ProfileAppointment.module.css";

export const ProfileAppointment = () => {
  const { appointmentArray } = useApiContext();

  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className={styles.section}>
      {!appointmentArray ? (
        <>You have no Appointments yet</>
      ) : (
        <>
          <p className={styles.newHeader}>Appointments</p>

          <div className={styles.container}>
            {appointmentArray.map((shop: shopType, index: number) => (
              <div key={index} className={styles.boxDiv}>
                <img src={shop.images[1]} alt="" />
                <div className={styles.detailBox}>
                  <h4 className={styles.shopName}>{shop.name}</h4>
                  <p
                    className={styles.rating}
                    style={{ display: "flex", gap: 9 }}
                  >
                    5.0
                    <FaStar />({getRandomInteger(1, 2000)})
                  </p>
                  <h3 className={styles.categoryName}>{shop.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
