"use client";
import Image from "next/image";
import styles from "./index.module.css";
import { MdLibraryBooks } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BsFillChatTextFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

//Defining type
interface Item {
  id?: number;
  images: string[];
  name: string;
  price: number;
  description: string;
  tags: string[];
  location: string;
  reviews: number;
  rating: number;
}

interface CardsProps {
  data: Item[];
}

const Card = ({ data }: CardsProps) => {
  const router = useRouter();
  const handleCardClick = (id: number | undefined) => {
    if (id) {
      router.push(`/portfolio/${id}`);
    }
  };
  const auth = useSelector((state: RootState) => state.auth);

  const createChatRoom = async (photographerId: string) => {
    console.log(auth);

    if (auth.isAuthenticated == false) {
      router.push(`/signup`);
    } else {
      await axios
        .post("http://localhost:8000/api/chat/rooms/create", {
          name: "Chat Room",
          participants: [photographerId, auth.user?.id],
        })
        .then((res) => {
          router.push(`/chat/${res.data.room_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.cards}>
      {data.map((item, index) => (
        <div
          key={item.id ?? index}
          onClick={() => handleCardClick(item.id)}
          className={styles.card}
        >
          <div className={styles.cardImages}>
            {Array.isArray(item.images) &&
              item.images.slice(0, 3).map((image, index) => (
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
            <p className={styles.description}>{item.description}</p>
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
                <div className={styles.starIcon}>
                  <FaStar />
                </div>
              </div>
            </div>

            <div className={styles.cardActions}>
              <Link
                href={`/booking?photographerId=${item.id}`}
                onClick={(e) => e.stopPropagation()}
                className={styles.btnPrimary}
              >
                <div>
                  <MdLibraryBooks className={styles.bookIcon} />
                </div>
                Book Now
              </Link>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (item && item.id) createChatRoom(item?.id?.toString());
                }}
                className={styles.btnSecondary}
              >
                <div>
                  <BsFillChatTextFill className={styles.msgIcon} />
                </div>
                Message
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
