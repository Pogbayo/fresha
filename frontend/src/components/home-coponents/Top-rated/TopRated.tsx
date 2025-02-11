import styles from "./TopRated.module.css";
export const TopRated = () => {
  return (
    <div className={styles.container}>
      <section>
        <h1>The top-rated destination for beauty and wellness</h1>
        <p>
          One solution, one software. Trusted by the best in the beauty and
          wellness industry
        </p>
        <div className={styles.div1}>
          <big>1 billion +</big>
          <p>Appointments booked on Fresha</p>
        </div>
      </section>

      <div className={styles.hori}>
        <div className={styles.div2}>
          <big>120+ countries</big>
          <p style={{ fontWeight: 700 }}>using spag</p>
        </div>
        <div className={styles.div3}>
          <big>120,000+</big>
          <p style={{ fontWeight: 700 }}>partner businesses</p>
        </div>
        <div className={styles.div4}>
          <big>450,000+</big>
          <p style={{ fontWeight: 700 }}>stylists and professionals</p>
        </div>
      </div>
    </div>
  );
};
