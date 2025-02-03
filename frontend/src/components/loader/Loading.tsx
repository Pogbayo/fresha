import styles from "./Loading.module.css";
export const Loading = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderOne}></div>
      <div className={styles.loaderTwo}></div>
      <div className={styles.loaderThree}></div>
    </div>
  );
};
