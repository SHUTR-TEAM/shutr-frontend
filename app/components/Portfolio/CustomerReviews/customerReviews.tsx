import React from "react";
import styles from "./customerReviews.module.css"; // Updated import for CSS Modules

type Review = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviewText: string;
  profileImage: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Pabodha M. Pathirana",
    location: "Colombo, Sri Lanka",
    rating: 4.2,
    reviewText: "Find professional photographers for every occasion—from weddings to corporate events, all in one place.",
    profileImage: "pic.png", // Replace with actual profile image URL
  },
  {
    id: 2,
    name: "Pabodha M. Pathirana",
    location: "Colombo, Sri Lanka",
    rating: 4.2,
    reviewText: "Find professional photographers for every occasion—from weddings to corporate events, all in one place.",
    profileImage: "pic.png", // Replace with actual profile image URL
  },
  {
    id: 3,
    name: "Pabodha M. Pathirana",
    location: "Colombo, Sri Lanka",
    rating: 4.2,
    reviewText: "Find professional photographers for every occasion—from weddings to corporate events, all in one place.",
    profileImage: "pic.png", // Replace with actual profile image URL
  },
];

const CustomerReviews: React.FC = () => {
  return (
    <section className={styles.customerReviews}>
      <h2 className={styles.title}>Customer Reviews</h2>
      <div className={styles.reviewsContainer}>
        {reviews.map((review) => (
          <div className={styles.reviewCard} key={review.id}>
            <p className={styles.reviewText}>{review.reviewText}</p>
            <div className={styles.reviewerDetails}>
              <img
                src={review.profileImage}
                alt={`Profile of ${review.name}`}
                className={styles.profileImage}
              />
              <div>
                <strong className={styles.reviewerName}>{review.name}</strong>
                <p className={styles.reviewerLocation}>{review.location}</p>
              </div>
              <span className={styles.rating}>{review.rating} ⭐</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
