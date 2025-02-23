import React from "react";
import styles from "./customerReviews.module.css"; // Updated import for CSS Modules


// interface ProfileReviewProps {
//   //id: string;
//   name: string;
//   rating: number;
//   reviewText: string;
//   profile_image_url: string; 
//   //coverImageUrl : string ;
//   //profileImageUrl : string ;
//   //time: string;
//   //imgUrl: string;
  
// }



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





// type Review = {
//   id: number;
//   name: string;
//   location: string;
//   rating: number;
//   reviewText: string;
//   profileImage: string;
// };

// const reviews: Review[] = [
//   {
//     id: 1,
//     name: "Pabodha M. Pathirana",
//     location: "Colombo, Sri Lanka",
//     rating: 4.2,
//     reviewText: "Find professional photographers for every occasion—from weddings to corporate events, all in one place.",
//     profileImage: "pic.png", // Replace with actual profile image URL
//   },
//   {
//     id: 2,
//     name: "Thasitha Pehesara Ariyachandra Wijethunga",
//     location: "Colombo, Sri Lanka",
//     rating: 4.2,
//     reviewText: "Find professional photographers for every occasion—from weddings to corporate events, all in one place.",
//     profileImage: "pic.png", // Replace with actual profile image URL
//   },
//   {
//     id: 3,
//     name: "Pabodha M. Pathirana",
//     location: "Colombo, Sri Lanka",
//     rating: 4.2,
//     reviewText: "Find professional photographers for every occasion—from weddings to corporate events, all in one place.",
//     profileImage: "pic.png", // Replace with actual profile image URL
//   },
// ];



// const truncateText = (text, maxLength) => 
//   text.length > maxLength ? text.substring(0, maxLength) + "..." : text;



  // const CustomerReviews: React.FC<ProfileReviewsProps> = () => {
  // return (
  //   <section className={styles.customerReviews}>
  //     <h2 className={styles.title}>Customer Reviews</h2>
  //     <div className={styles.reviewsContainer}>
  //       {reviews.map((review) => (
  //         <div className={styles.reviewCard} key={review.id}>
  //           <p className={styles.reviewText}>{review.reviewText}</p>
  //           <div className={styles.reviewerDetails}>
  //             <img
  //               src={review.profileImage}
  //               alt={`Profile of ${review.name}`}
  //               className={styles.profileImage}
  //             />
  //             <div>
  //               <strong className={styles.reviewerName}>{/*truncateText(*/review.name /*name, 20)*/}</strong>
  //               <p className={styles.reviewerLocation}>{review.location}</p>
  //             </div>
  //             <span className={styles.rating}>{review.rating} ⭐</span>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // );
  const CustomerReviews: React.FC<ProfileReviewsProps> = ({ reviews}) => {
  return (
    <section className={styles.customerReviews}>
      <h2 className={styles.title}>Customer Reviews</h2>
      <div className={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div className={styles.reviewCard} key={index}>
            <p className={styles.reviewText}>{review.reviewText}</p>
            <div className={styles.reviewerDetails}>
              <img
                src={review.profile_image_url}
                alt={`Profile of ${review.name}`}
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
