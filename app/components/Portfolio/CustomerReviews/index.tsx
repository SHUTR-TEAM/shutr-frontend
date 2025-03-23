import React, { useEffect, useState } from "react";
import styles from "./index.module.css"; // Updated import for CSS Modules
// import Image from 'next/image'
import { Star, Trash2 } from "lucide-react";
import { useDispatch, useSelector} from "react-redux";
import { postReview } from "@/app/redux/features/portfolio";
import { getByIdreview, deleteReview } from "@/app/redux/features/portfolio";
import { RootState, AppDispatch } from "@/app/redux/store";


  const CustomerReviews: React.FC = () => {

    const [newReview, setNewReview] = useState({
      rating: 0,
      reviewText: '',
    });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      dispatch(getByIdreview({ /*participantId: "67db026680a585e2d2cd7439"*/ portfolioID: "67ab65b24cb48a7c886d0dfa" }));
    }, [dispatch]);

    const activeReview = useSelector((state: RootState) => state.portfolio.activeReview) ;

    const Review = activeReview?.data ?? []; // If null, default to empty array

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return; // Prevent double submission
      setIsSubmitting(true);

      const reviewData = {
        userID: "67db026680a585e2d2cd7439", // Replace with dynamic user ID
        // photographerID: "67db026680a585e2d2cd7439", // Replace with dynamic photographer ID
        portfolioID: "67ab65b24cb48a7c886d0dfa",
        rating: newReview.rating,
        reviewText: newReview.reviewText,
      };

      try {
        await dispatch(postReview(reviewData));
        await dispatch(getByIdreview({ portfolioID: "67ab65b24cb48a7c886d0dfa" }));
      } catch (error) {
        console.error("Error submitting review:", error);
      } finally {
        setIsSubmitting(false); // Allow new submissions
    
        // Reset form fields
        setNewReview({
          rating: 0,
          reviewText: "",
        });
      }


    };


    const handleDeleteReview = async (reviewId: string) => {
      dispatch(deleteReview(reviewId))
        .unwrap()
        .then((res) => {
          console.log("Review deleted successfully:", res);
        })
        .catch((err) => {
          console.error("Error deleting review:", err);
        });
        await dispatch(getByIdreview({ portfolioID: "67ab65b24cb48a7c886d0dfa" }));

    };

  return (
    <section className={styles.customerReviews}>
      <h2 className={styles.title}>Customer Reviews</h2>


      {/* Review Input Form */}
      <div className={styles.reviewInputSection}>
        <h3 className={styles.subtitle}>Write a Review</h3>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          

          <div className={styles.formGroup}>
            <label htmlFor="reviewText">Review</label>
            <textarea
              id="reviewText"
              value={newReview.reviewText}
              onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
              required
              className={styles.textarea}
              placeholder="Share your experience..."
              rows={4}
            />
          </div>


          <div className={styles.formGroup}>
            <label>Rating</label>
            <div className={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={styles.starButton}
                >
                  <Star
                    className={star <= newReview.rating ? styles.starFilled : styles.starEmpty}
                    size={24}
                  />
                </button>
                
              ))}
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </form>
      </div>



      {/* Display Reviews only after data is fetched */}
      <div className={styles.reviewsContainer}>
        {Review && Review.length > 0 ? (
          Review.map((review, index) => (
            <div className={styles.reviewCard} key={index}>
              {/* Display Review Text */}
              <p className={styles.reviewText}>{review.reviewText}</p>

              <div className={styles.reviewerDetails}>
                {/* User Profile Image */}
                {/* <Image
                  src={review.user?.profile_image_url || "/default-profile.png"} 
                  alt={`Profile of ${review.user?.first_name || "User"}`}
                  width={60}
                  height={60}
                  className={styles.profileImage}
                /> */}

                <div>
                  {/* User Name */}
                  <strong className={styles.reviewerName}>
                    {review.user?.first_name} {review.user?.last_name}
                  </strong>
                </div>

                {/* Display Rating */}

                <div className = {styles.deleteContainer}>
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              
                              className = {styles.deleteButton}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                <span className={styles.rating}>{review.rating} ⭐</span>
              </div>
            </div>
          ))
        ) : (
          // <p>No reviews available yet.</p>
          <div className={styles.innerContainer}>
          <h3 className={styles.heading}>No reviews available yet.</h3>
          </div>
        )}
      </div>

    </section>
  );
};

export default CustomerReviews;
