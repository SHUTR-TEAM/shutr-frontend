import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import styles from './Packages.module.css';

const Packages = () => {
  //const navigate = useNavigate();
  // const [selectedPackage, setSelectedPackage] = useState(null);


  // const navigate = useNavigate();
  // const [selectedPackage, setSelectedPackage] = useState(null);

  // const packages = [
  //   {
  //     id: 1,
  //     title: 'Basic Session',
  //     price: '$150',
  //     description: '1-hour photo session with 10 edited photos',
  //     details: ['1 hour of coverage', '10 edited photos', 'Digital delivery']
  //   },
  //   {
  //     id: 2,
  //     title: 'Premium Package',
  //     price: '$300',
  //     description: '2-hour photo session with 25 edited photos',
  //     details: ['2 hours of coverage', '25 edited photos', 'Digital delivery', 'Print release']
  //   }
  // ];

  // const handleSelectPackage = (pkg) => {
  //   setSelectedPackage(pkg);
  // };

  // const handleBookNow = () => {
  //   if (selectedPackage) {
  //     navigate('/book', { state: { package: selectedPackage } });
  //   } else {
  //     alert('Please select a package before booking.');
  //   }
  // };
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

        {/* <div className={styles.container}>
        <h2 className={styles.heading}>Packages</h2>
        
        {packages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`${styles.packageCard} ${selectedPackage?.id === pkg.id ? styles.selected : ''}`} 
            onClick={() => handleSelectPackage(pkg)}
          >
            <div className={styles.packageHeader}>
              <h3 className={styles.packageTitle}>{pkg.title}</h3>
              <span className={styles.packagePrice}>{pkg.price}</span>
            </div>
            <p className={styles.packageDescription}>{pkg.description}</p>
            <ul className={styles.packageList}>
              {pkg.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        ))} */}


      
      {/* <button className={styles.bookButton} onClick={() => navigate('/book')}>Book Now</button>
      <button className={styles.messageButton}onClick={() => navigate('/message')}> */}
      {/* <button className={styles.bookButton} onClick={handleBookNow}>Book Now</button> */}
      <button className={styles.bookButton}>Book Now</button>
      <button className={styles.messageButton}>
        <span className={styles.icon}>&#128172;</span> Message Photographer
      </button>
    </div>
  );
}
export default Packages;