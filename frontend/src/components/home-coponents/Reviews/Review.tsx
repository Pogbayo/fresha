import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Reviews.module.css";
import { FaStar } from "react-icons/fa";

interface DataType {
  name: string;
  title: string;
  description: string;
  city: string;
  country: string;
}
export const Review = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/reviews");
        setData(response.data);
      } catch (error) {
        return error;
      }
    };
    fetchedData();
  }, []);
  console.log(data);
  const generateLightColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 90%)`; // Pastel-like shades
  return (
    <div className={styles.container}>
      {/* {error && <p className={styles.error}>{error}</p>}{" "} */}
      {/* Display error message */}
      {data?.map((review, index) => (
        <div key={index} className={styles.boxDiv}>
          <span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </span>
          <h3>{review.name}</h3>
          <p>{review.title}</p>
          <p>{review.description}</p>
          <section>
            <p
              className={styles.firstLetter}
              style={{
                backgroundColor: generateLightColor(),
                color: "#333",
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
  );
};
