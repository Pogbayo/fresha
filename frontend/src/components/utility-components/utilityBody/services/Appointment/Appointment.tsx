import { useApiContext } from "../../../../../contextAPi/ApiResponseContext/useApiContext";
import { useState } from "react";
import styles from "./Appointment.module.css";
import { IoIosStar } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

export const Appointment = () => {
  const {
    setShowAppointment,
    categoryArray,
    handleContinue,
    subServiceArray,
    totalPrice,
  } = useApiContext();
  const shopsFromCategoryOne = categoryArray?.[4]?.shops;
  const shopFromShopOne = shopsFromCategoryOne?.[1];
  const shop = shopFromShopOne;

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showBookNowDiv, setShowBookNowDiv] = useState(false);

  function generateRandomDecimal() {
    let num;
    do {
      num = Math.random() * (5.0 - 3.7) + 3.7;
      num = parseFloat(num.toFixed(1));
    } while (num % 1 === 0);
    return num;
  }

  const handleShowConfirmBookingDiv = (name: string) => {
    setSelectedMember(name);
    setShowBookNowDiv(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.appointmentButtonDivs}>
        <button
          onClick={() => setShowAppointment(false)}
          className={styles.goBackButton}
        >
          <IoIosArrowRoundBack size={30} />
        </button>
        <button>
          <VscClose size={30} />
        </button>
      </div>

      {!showBookNowDiv && (
        <div className={styles.teamContainer}>
          <h1>Team</h1>
          <span>
            {shop?.team?.map((member, index) => (
              <div
                key={index}
                onClick={() => handleShowConfirmBookingDiv(member.name)}
                className={`${styles.teamMember} ${
                  selectedMember === member.name ? styles.active : ""
                }`}
              >
                <p className={styles.firstLetter}>{member.name[0]}</p>
                <p className={styles.randomNumber}>
                  {generateRandomDecimal()}
                  <IoIosStar />
                </p>
                <p className={styles.name}>{member.name}</p>
                <p className={styles.role}>{member.role}</p>
              </div>
            ))}
          </span>
        </div>
      )}

      {showBookNowDiv && (
        <>
          <div style={{ margin: 0, fontWeight: 900 }}>Review booking</div>
          <div className={styles.bookNow}>
            <div className={styles.one}>
              <img src={shop?.images[0]} alt="" />
              <div>
                <p className={styles.bookName}>
                  {shop?.name} - {shop?.address[0].city}
                </p>
                <span className={styles.span}>
                  <p>4.6</p>
                  <p className={styles.starTag}>
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                  </p>
                  <p>(578)</p>
                </span>
                <p>
                  {shop?.address[0].city}, {shop?.address[0].country}
                </p>
              </div>
            </div>

            <div className={styles.twoContainer}>
              {subServiceArray?.map((subservice, index) => (
                <div
                  key={index}
                  className={styles.two}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className={styles.spanOne}>
                    <p style={{ color: "black" }}>{subservice?.name}</p>
                    <p>{subservice?.duration}</p>
                  </span>
                  <span className={styles.spanTwo}>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "grey",
                      }}
                    >
                      <TbCurrencyNaira />
                      {subservice.price},000
                    </p>
                  </span>
                </div>
              ))}
            </div>

            <span className={styles.three}>
              <p>Total:</p>
              {subServiceArray.length > 0 ? (
                <p
                  style={{
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TbCurrencyNaira />
                  {totalPrice},000
                </p>
              ) : (
                <p>Free</p>
              )}
            </span>
            <button className={styles.continueButton} onClick={handleContinue}>
              Make Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};
