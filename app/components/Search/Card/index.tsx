import Image from 'next/image';
import styles from "./index.module.css"
import { MdLibraryBooks } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import Link from 'next/link';

//Defining type
interface Item {
  id?: number;
  images: string[];
  name: string;
  price: number;
  description:string;
  tags: string[];
  location: string;
  reviews: number;
  rating: number;
}


interface CardsProps {
  data: Item[];
}

const Card = ({ data }: CardsProps) => {
  return (
    <div className={styles.cards}>
      {data.map((item,index) => (
        <Link key={item.id ?? index}  href={`/portfolio/${item.id}`} className={styles.card}>
          <div className={styles.cardImages}>
            {Array.isArray(item.images) && item.images.slice(0, 3).map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image}
                alt={item.name}
                width={100}
                height={80}
                layout="responsive"
                className={styles.image}
              />
            </div>
            ))}
          </div>

          <div className={styles.cardContent}>
            <h4 className={styles.price}>From {item.price} LKR</h4>
            <p className={styles.description}>
              {item.description}
            </p>
            <div className={styles.tags}>
              {item.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.info}>
              <div>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.location}>{item.location}</p>
              </div>

              <div className={styles.review}>
                <p className={styles.reviews}>
                  ({item.reviews}) {item.rating}
                </p>
                <div className={styles.starIcon}><FaStar /></div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <Link href={`/booking/${item.id}`}  onClick={(e) => e.stopPropagation()} className={styles.btnPrimary}>
                <div><MdLibraryBooks className={styles.bookIcon} /></div>
                Book Now
              </Link>
              <Link href={`/message/${item.id}`}  onClick={(e) => e.stopPropagation()} className={styles.btnSecondary}>
                <div><BsFillChatTextFill className={styles.msgIcon} /></div>
                Message
              </Link>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;