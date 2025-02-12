import styles from "./ProfileDeets.module.css";
export const ProfileDeets = () => {
  return (
    <div className={styles.mainContainer}>
      <h2>Profile</h2>

      <div className={styles.container}>
        <div className={styles.imageDiv}>
          <img src="" alt="" />
          <p>Adesanya Oluwasegun</p>
        </div>
        <div className={styles.detailsDiv}>
          <span>
            <h3>First name</h3>
            <p> Adebayo</p>{" "}
          </span>
          <span>
            <h3>Last name</h3>
            <p> Adesanya</p>{" "}
          </span>
          <span>
            <h3>Mobile number</h3>
            <p> 0913584072</p>{" "}
          </span>
          <span>
            <h3>Email</h3>
            <p> adebayooluwasegun335@gmail.com</p>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
