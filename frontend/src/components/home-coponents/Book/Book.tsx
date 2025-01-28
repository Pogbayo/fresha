import styles from "./Book.module.css";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { MdDateRange } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { IoQrCode } from "react-icons/io5";

export const Book = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.bigFont}>
        Book local beauty and wellness services
      </h1>

      <form action="" className={styles.formContainer}>
        <span>
          <CiSearch size={20} />
          <input type="text" placeholder="All Treatments and venues" />
        </span>

        <span>
          <CiLocationOn />
          <input type="text" placeholder="Current location" />
        </span>
        <span>
          <MdDateRange />
          <input type="text" placeholder="Any Date" />
        </span>
        <span>
          <IoTimeOutline />
          <input type="text" placeholder="Any time" />
        </span>
        <span>
          <button>Search spag</button>
        </span>
      </form>
      <h2>403,834 appointments booked today</h2>
      <button className={styles.qrCodeButton}>
        Get the app
        <IoQrCode />
      </button>
    </div>
  );
};
