import styles from './Packages.module.css';

const Packages = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Packages</h2>
      
      <div className={styles.packageCard}>
        <div className={styles.packageHeader}>
          <h3 className={styles.packageTitle}>Basic Session</h3>
          <span className={styles.packagePrice}>$150</span>
        </div>
        <p className={styles.packageDescription}>1-hour photo session with 10 edited photos</p>
        <ul className={styles.packageList}>
          <li>1 hour of coverage</li>
          <li>10 edited photos</li>
          <li>Digital delivery</li>
        </ul>
      </div>
      
      <div className={styles.packageCard}>
        <div className={styles.packageHeader}>
          <h3 className={styles.packageTitle}>Premium Package</h3>
          <span className={styles.packagePrice}>$300</span>
        </div>
        <p className={styles.packageDescription}>2-hour photo session with 25 edited photos</p>
        <ul className={styles.packageList}>
          <li>2 hours of coverage</li>
          <li>25 edited photos</li>
          <li>Digital delivery</li>
          <li>Print release</li>
        </ul>
      </div>
      
      <button className={styles.bookButton}>Book Now</button>
      <button className={styles.messageButton}>
        <span className={styles.icon}>&#128172;</span> Message Photographer
      </button>
    </div>
  );
}
export default Packages;