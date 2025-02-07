import { shopType } from "../../../../contextAPi/ApiResponseContext/ApiContext";
import styles from "./Team.module.css";
import { IoIosStar } from "react-icons/io";

export const Team = ({ shop }: { shop: shopType }) => {
  function generateRandomDecimal() {
    let num;
    do {
      num = Math.random() * (5.0 - 3.7) + 3.7;
      num = parseFloat(num.toFixed(1));
    } while (num % 1 === 0);
    return num;
  }
  console.log(shop);
  return (
    <div className={styles.teamContainer}>
      <h1>Team</h1>
      <span>
        {shop?.team?.map((member, index) => {
          return (
            <div key={index}>
              <p className={styles.firstLetter}>{member.name[0]}</p>
              <p className={styles.randomNumber}>
                {generateRandomDecimal()}
                <IoIosStar />
              </p>
              <p className={styles.name}>{member.name}</p>
              <p className={styles.role}>{member.role}</p>
            </div>
          );
        })}
      </span>
    </div>
  );
};
