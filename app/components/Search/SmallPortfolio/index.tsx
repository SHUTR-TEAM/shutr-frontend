import Image from 'next/image';
import styles from "./index.module.css";

interface Item {
  id: number;
  image: string;
  name: string;
  price: number;
  tags: string[];
  location: string;
  reviews: number;
  rating: number;
}

interface CardsProps {
  data: Item[];
}

const SmallPortfolio = ({ data }: CardsProps) => {
  return (
    <div className={styles.cards}>
      {data.map((item) => (
        <div key={item.id} className={styles.card}>
          {/* Card Image */}
          <div className={styles.cardImage}>
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={150}
              layout="responsive"
            />
          </div>

          {/* Card Content */}
          <div className={styles.cardContent}>
            <h4 className={styles.price}> From {item.price} LKR</h4>
            {/* Tags */}
            <div className={styles.tags}>
              {item.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            {/* Info */}
            <p className={styles.info}>
              <span>{item.name}</span> <br />
              <span>{item.location}</span>
            </p>
            {/* Reviews */}
            <p className={styles.reviews}>
              ({item.reviews}) {item.rating} ⭐
            </p>
            {/* Actions */}
            <div className={styles.cardActions}>
              <button className={styles.btnPrimary}>Book Now</button>
              <button className={styles.btnSecondary}>Message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmallPortfolio;
