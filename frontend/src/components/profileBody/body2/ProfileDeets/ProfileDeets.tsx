import { useAuth } from "../../../../contextAPi/Auth/useAuthContext";
import styles from "./ProfileDeets.module.css";
export const ProfileDeets = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className={styles.mainContainer}>
      <h2>Profile</h2>

      <div className={styles.container}>
        <div className={styles.imageDiv}>
          <img src="" alt="" />
          <p>
            {user?.firstname} {user?.lastname}
          </p>
        </div>
        <div className={styles.detailsDiv}>
          <span>
            <h3>First name</h3>
            <p> {user?.firstname}</p>{" "}
          </span>
          <span>
            <h3>Last name</h3>
            <p> {user?.lastname}</p>{" "}
          </span>
          <span>
            <h3>Mobile number</h3>
            <p>+{user?.telephone}</p>{" "}
          </span>
          <span>
            <h3>Email</h3>
            <p> {user?.email}</p>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
