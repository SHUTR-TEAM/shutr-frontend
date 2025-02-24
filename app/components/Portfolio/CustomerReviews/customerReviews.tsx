import React from "react";
import styles from "./customerReviews.module.css"; // Updated import for CSS Modules
import Image from 'next/image'


interface ReviewFormat {
  name: string;
  rating: number;
  reviewText: string;
  profile_image_url: string;
  address : string ;
}

interface ProfileReviewsProps {
  reviews: ReviewFormat[];
}


  const CustomerReviews: React.FC<ProfileReviewsProps> = ({ reviews}) => {
  return (
    <section className={styles.customerReviews}>
      <h2 className={styles.title}>Customer Reviews</h2>
      <div className={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div className={styles.reviewCard} key={index}>
            <p className={styles.reviewText}>{review.reviewText}</p>
            <div className={styles.reviewerDetails}>
              {/* <img
                src={review.profile_image_url}
                alt={`Profile of ${review.name}`}
                className={styles.profileImage}
              /> */}

              <Image
                src={review.profile_image_url}
                alt={`Profile of ${review.name}`}
                width={60}
                height={60}
                className={styles.profileImage}
              />

              <div>
                <strong className={styles.reviewerName}>{/*truncateText(*/review.name /*name, 20)*/}</strong>
                { <p className={styles.reviewerLocation}>{review.address}</p> }
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
