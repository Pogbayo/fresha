import { useState, useEffect } from "react";
import styles from "./SelectService.module.css";
// import { TbCurrencyNaira } from "react-icons/tb";
import {
  shopType,
  subServiceType,
} from "../../../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../../../contextAPi/ApiResponseContext/useApiContext";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { BookNowDiv } from "../../BookNowDiv/BookNowDiv";
import { Appointment } from "../Appointment/Appointment";
// import { subServiceType } from "../../../../../contextAPi/ApiResponseContext/ApiContext";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const SelectService = () => {
  const [button, loadingButton] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeArray, setActiveArray] = useState<
    shopType["services"][number] | null
  >(null);
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  const {
    // categoryArray,
    handleContinue,
    showAppointment,
    formattedTotalPrice,
    addSubService,
    subServiceArray,
    utilShop,
  } = useApiContext();

  // const shopsFromCategoryOne = categoryArray?.[4]?.shops;
  // const shopFromShopOne = shopsFromCategoryOne?.[1];
  // const shop = shopFromShopOne;
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (utilShop?.services?.length) {
      setActiveService(utilShop.services[0].name);
      setActiveArray(utilShop.services[0]);
    }
  }, [utilShop]);

  const services = utilShop?.services?.map((service) => service.name) || [];
  console.log();
  const handleSetActiveSerice = (item: string, index: number) => {
    setActiveService(item);
    if (utilShop) {
      setActiveArray(utilShop.services[index]);
    }
  };

  const toggleSubServiceSelection = (subService: subServiceType) => {
    setSelectedSubServices((prevSelected) =>
      prevSelected.includes(subService.name)
        ? prevSelected.filter((name) => name !== subService.name)
        : [...prevSelected, subService.name]
    );
    addSubService(subService);
  };

  const handleLoader = () => {
    loadingButton(true);

    setTimeout(() => {
      handleContinue();
      loadingButton(false);
    }, 2000);
  };

  const navigate = useNavigate();
  return (
    <div className={styles.app}>
      {!showAppointment ? (
        <div className={styles.serviceContainer}>
          <div className={styles.firstContainer}>
            <span className={styles.goBack}>
              <IoArrowBackOutline
                size={23}
                onClick={() => navigate("/utility")}
              />
            </span>

            <h1>Select services</h1>
            <div className={styles.tagContainer}>
              <div className={styles.miniTags}>
                {services.map((item, index) => (
                  <p
                    key={index}
                    className={activeService === item ? styles.active : ""}
                    onClick={() => handleSetActiveSerice(item, index)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.subServiceContainer}>
              {activeArray?.subServices?.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.subService} ${
                    selectedSubServices.includes(item.name) ? styles.active : ""
                  }`}
                  onClick={() => toggleSubServiceSelection(item)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.duration}>{item.duration}</p>
                    <p className={styles.price}>
                      <TbCurrencyNaira />
                      {item.price === 2
                        ? `${item.price}000`
                        : `${item.price},000`}
                    </p>
                  </span>
                  <button className={styles.bookButton}>
                    <FaPlus />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bookNow}>
            <div className={styles.one}>
              {isImageLoading && (
                <div className={styles.imageLoader}>Loading image...</div>
              )}
              <img
                src={utilShop?.images[0]}
                alt=""
                style={{ display: isImageLoading ? "none" : "block" }}
                onLoad={() => setIsImageLoading(false)}
              />
              {!isImageLoading && (
                <div>
                  <p className={styles.bookName}>
                    {utilShop?.name} - {utilShop?.address[0].city}
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
                    <p> (578)</p>
                  </span>
                  <p>
                    {utilShop?.address[0].city}, {utilShop?.address[0].country}
                  </p>
                </div>
              )}
            </div>

            <div className={styles.twoContainer}>
              {subServiceArray.length === 0 ? (
                <small
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: 10,
                    marginTop: 20,
                    fontWeight: 900,
                    color: "grey",
                  }}
                >
                  no service yet
                </small>
              ) : (
                <>
                  {" "}
                  {subServiceArray?.map((subservice) => {
                    return (
                      <div className={styles.two}>
                        <span className={styles.spanOne}>
                          <p style={{ color: "black" }}> {subservice?.name}</p>
                          <p> {subservice.duration}</p>
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
                    );
                  })}
                </>
              )}
            </div>

            <span className={styles.three}>
              <p>Total</p>
              {subServiceArray.length > 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <p>free</p>
                </>
              )}
            </span>
            <button className={styles.continueButton} onClick={handleLoader}>
              {!button ? (
                <>Make Payment</>
              ) : (
                <div className={styles.wrapper}>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                  <div className={styles.circle}></div>
                </div>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.appointmentContainer}>
          <Appointment />
        </div>
      )}
      {!showAppointment && utilShop && <BookNowDiv shop={utilShop} />}
    </div>
  );
};
