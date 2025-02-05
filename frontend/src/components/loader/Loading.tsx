import styles from "./Loading.module.css";
export const Loading = () => {
  return (
    <div>
      <h1 className={styles.loadingHeader}></h1>
      <div className={styles.loaderContainer}>
        <div className={styles.loaderOne}></div>
        <div className={styles.loaderTwo}></div>
        <div className={styles.loaderThree}></div>
      </div>
    </div>
  );
};
