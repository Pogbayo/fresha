import {
  shopType,
  subServiceType,
} from "../../../contextAPi/ApiResponseContext/ApiContext";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";
import styles from "./Body.module.css";
import { IoMdStar } from "react-icons/io";
import { HiAdjustmentsVertical } from "react-icons/hi2";
import { Leaflet } from "./Leaflet/Leaflet";
import { useEffect, useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Body = () => {
  const { categoryArray, displayUtilShop } = useApiContext();
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();
  const allShops = categoryArray.flatMap((category) => {
    const shops = category.shops.slice(0, 7);
    return shops.filter(Boolean);
  });

  function generateRandomDecimal() {
    let num;
    do {
      num = Math.random() * 4 + 1;
      num = parseFloat(num.toFixed(1));
    } while (num % 1 === 0);
    return num;
  }

  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setTimeout(() => {
      setShowMap(true);
    }, 2000);
  }, []);
  const handleDisplayClick = (shop: shopType) => {
    displayUtilShop(shop);
    navigate("/utility");
  };
  return (
    <div className={styles.container}>
      <div className={styles.shopsColumn}>
        {categoryArray.length > 0 ? (
          <>
            <div className={styles.headerDiv}>
              <p>234 venues nearby</p>
              <button className={styles.filterButton}>
                <HiAdjustmentsVertical size={20} />
                Filter
              </button>
            </div>
            {allShops
              .sort(() => Math.random() - 0.5)
              .map((shop: shopType, index) => (
                <div className={styles.shop} key={index}>
                  <img
                    src={shop.images[0]}
                    alt={shop.name}
                    className={styles.shopImage}
                  />
                  <div className={styles.serviceDetails}>
                    <h3 className={styles.serviceName}>{shop.name}</h3>
                    <p className={styles.ratingContainer}>
                      {generateRandomDecimal()} ·{" "}
                      <small style={{ marginRight: 1, marginTop: 5 }}>
                        <IoMdStar />
                        <IoMdStar />
                        <IoMdStar />
                        <IoMdStar />
                        <IoMdStar />
                      </small>
                      <span style={{ marginLeft: 4, fontWeight: 700 }}>
                        ({generateRandomNumber(1, 600)})
                      </span>
                    </p>
                    <div className={styles.address}>
                      {Array.isArray(shop.address)
                        ? shop.address.map((item, index) => (
                            <span
                              key={index}
                              style={{ display: "flex", gap: 5 }}
                            >
                              <p style={{ margin: 0 }}>{item.city},</p>
                              <p style={{ margin: 0 }}>{item.country}</p>
                            </span>
                          ))
                        : shop.address}
                    </div>
                  </div>
                  <div className={styles.subServices}>
                    {shop.services[0].subServices
                      .slice(0, 3)
                      .map((item: subServiceType, index) => (
                        <div className={styles.nameAndPrice} key={index}>
                          <span className={styles.span}>
                            <p className={styles.subServiceName}>{item.name}</p>
                            <p className={styles.subServicePrice}>
                              <TbCurrencyNaira />
                              {item.price === 2
                                ? `${item.price}000`
                                : `${item.price},000`}
                            </p>
                          </span>
                          <p className={styles.subServiceDuration}>
                            {item.duration}
                          </p>
                        </div>
                      ))}
                    <button
                      onClick={() => {
                        handleDisplayClick(shop);
                      }}
                    >
                      See more
                    </button>
                  </div>
                </div>
              ))}
          </>
        ) : (
          <div className={styles.loaderContainer}>
            <div className={styles.upperDiv}>
              <p></p>
              <button className={styles.upperDivbutton}></button>
            </div>
            <div className={styles.lowerDiv}>
              <div className={styles.loaderOne}></div>
              <div className={styles.loaderTwo}></div>
              <div className={styles.loaderThree}></div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.mapContainer}>
        {showMap && <Leaflet shops={allShops} />}
      </div>
    </div>
  );
};
