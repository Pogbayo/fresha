import { useApiContext } from "../../../../../contextAPi/ApiResponseContext/useApiContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Appointment.module.css";
import { IoIosStar } from "react-icons/io";
import { VscClose } from "react-icons/vsc";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import { shopType } from "../../../../../contextAPi/ApiResponseContext/ApiContext";

export const Appointment = () => {
  const {
    setShowAppointment,
    categoryArray,
    subServiceArray,
    setsubServiceArray,
    formattedTotalPrice,
    utilShop,
    addToAppointmentArray,
  } = useApiContext();
  const navigate = useNavigate();

  const shopsFromCategoryOne = categoryArray?.[4]?.shops;
  const shopFromShopOne = utilShop ? utilShop : shopsFromCategoryOne?.[1];
  const shop = shopFromShopOne;

  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showBookNowDiv, setShowBookNowDiv] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleShowConfirmBookingDiv = (name: string) => {
    setSelectedMember(name);
    setShowBookNowDiv(true);
  };

  const handleConfirmAppointment = (shop: shopType) => {
    setIsLoading(true);
    setSuccessMessage(null);

    setTimeout(() => {
      addToAppointmentArray(shop);
      setIsLoading(false);
      setSuccessMessage(
        "Appointment booked. Kindly check your email for more details."
      );
      setTimeout(() => {
        navigate("/utility");
      }, 2000);

      setsubServiceArray([]);
    }, 3500);
  };

  return (
    <div>
      {isLoading ? (
        <div className={styles.overlay}>
          <div className={styles.loader}>
            <div className={styles.boxOne}></div>
            <div className={styles.boxTwo}></div>
            <div className={styles.boxThree}></div>
          </div>
        </div>
      ) : (
        <>
          {successMessage && (
            <div className={styles.successPopup}>{successMessage}</div>
          )}

          {!successMessage && (
            <div className={styles.container}>
              {showBookNowDiv && (
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
              )}

              {!showBookNowDiv && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className={styles.teamContainer}>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <div
                        onClick={() => setShowAppointment(false)}
                        className={styles.selectServiceButton}
                        style={{ marginLeft: "0px" }}
                      >
                        <IoIosArrowRoundBack size={30} />
                        <button>Select service</button>
                      </div>
                    </div>

                    <h1>Select a professional</h1>
                    <span>
                      {shop?.team?.map((member, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            handleShowConfirmBookingDiv(member.name)
                          }
                          className={`${styles.teamMember} ${
                            selectedMember === member.name ? styles.active : ""
                          }`}
                        >
                          <p className={styles.firstLetter}>{member.name[0]}</p>
                          <p className={styles.randomNumber}>
                            4.7 <IoIosStar />
                          </p>
                          <p className={styles.name}>{member.name}</p>
                          <p className={styles.role}>{member.role}</p>
                        </div>
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {showBookNowDiv && (
                <>
                  <div style={{ margin: 0, fontWeight: 900 }}>
                    Review booking
                  </div>
                  <div className={styles.bookNow}>
                    <div className={styles.one}>
                      <img src={shop?.images[0]} alt="" />
                      <div>
                        <p className={styles.bookName}>
                          {shop?.name} - {shop?.address[0].city}
                        </p>
                        <span className={styles.span}>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: 700,
                              color: "grey",
                            }}
                          >
                            4.6
                          </p>
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
                      {subServiceArray.length === 0 ? (
                        <small
                          style={{
                            display: "block",
                            textAlign: "center",
                            padding: 10,
                            marginTop: 20,
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            color: "grey",
                          }}
                        >
                          No service yet
                        </small>
                      ) : (
                        subServiceArray.map((subservice, index) => (
                          <div
                            key={index}
                            className={styles.two}
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <span className={styles.spanOne}>
                              <p style={{ color: "black" }}>
                                {subservice?.name}
                              </p>
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
                        ))
                      )}
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
                          {formattedTotalPrice},000
                        </p>
                      ) : (
                        <p>Free</p>
                      )}
                    </span>

                    <button
                      onClick={() => handleConfirmAppointment(shop)}
                      className={`${styles.continueButton} ${
                        subServiceArray.length === 0
                          ? styles.disabledButton
                          : ""
                      }`}
                      disabled={subServiceArray.length === 0}
                    >
                      Confirm appointment
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
