import { useState, useEffect } from "react";
import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import styles from "./service.module.css";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Service = ({ shop }: { shop: shopType }) => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeArray, setActiveArray] = useState<
    shopType["services"][number] | null
  >(null);

  useEffect(() => {
    if (shop?.services?.length) {
      setActiveService(shop.services[0].name);
      setActiveArray(shop.services[0]);
    }
  }, [shop]);

  const services = shop?.services?.map((service) => service.name) || [];

  const handleSetActiveSerice = (item: string, index: number) => {
    setActiveService(item);
    setActiveArray(shop.services[index]);
  };
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <h1>Services</h1>
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
          {activeArray?.subServices?.slice(0, 3)?.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.subService}
                onClick={() => navigate("/select")}
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
                <button className={styles.bookButton}>Book</button>
              </div>
            );
          })}
        </div>
        <button className={styles.seeMore} onClick={() => navigate("/select")}>
          see more
        </button>
      </div>
    </div>
  );
};
