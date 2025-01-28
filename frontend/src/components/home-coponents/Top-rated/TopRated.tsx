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
      </section>
      <div>
        <big>1 billion +</big>
        <p>Appointments booked on Fresha</p>
      </div>
      <div>
        <big>120 + countries</big>
        <p>using Fresha</p>
      </div>
      <div>
        <big>120,000+</big>
        <p>partner businesses</p>
      </div>
      <div>
        <big>450,000+</big>
        <p>stylists and professionals</p>
      </div>
    </div>
  );
};
