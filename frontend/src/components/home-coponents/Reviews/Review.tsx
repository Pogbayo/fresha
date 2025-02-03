import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Reviews.module.css";
import { FaStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useApiContext } from "../../../contextAPi/ApiResponseContext/useApiContext";

interface DataType {
  name: string;
  title: string;
  description: string;
  city: string;
  country: string;
}
export const Review = () => {
  const [data, setData] = useState<DataType[]>([]);
  const { reviewsRef, scroll } = useApiContext();
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setData(response.data);
      } catch (error) {
        return error;
      }
    };
    fetchedData();
  }, []);
  const generateLightColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 90%)`; // Pastel-like shades
  return (
    <div className={styles.section}>
      <button
        className={`${styles.scrollButton} ${styles.leftArrow}`}
        onClick={() => scroll(reviewsRef, "left")}
      >
        <FaAngleLeft size={20} />
      </button>
      <button
        className={`${styles.scrollButton} ${styles.rightArrow}`}
        onClick={() => scroll(reviewsRef, "right")}
      >
        <FaAngleRight size={20} />
      </button>

      <div className={styles.container} ref={reviewsRef}>
        {data?.map((review, index) => (
          <div key={index} className={styles.boxDiv}>
            <span
              style={{
                display: "flex",
                gap: 5,
              }}
            >
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </span>
            <h3
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                marginBottom: 0,
              }}
            >
              {review.name}
            </h3>
            <p>{review.title}</p>
            <p>{review.description}</p>
            <section>
              <p
                className={styles.firstLetter}
                style={{
                  backgroundColor: generateLightColor(),
                  color: "#333",
                  fontWeight: 900,
                }}
              >
                {review.name[0]}
              </p>
              <p className={styles.secondLetter}>
                {review.city}, {review.country}
              </p>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
};
