// import BookingForm from "../components/Booking/BookingForm";

// const BookingPage = () => {
//   return (
//     <div>
//       <BookingForm />
//     </div>
//   );
// };

// export default BookingPage;


"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "../components/Booking/BookingForm";

const BookingPage = () => {
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package")
    ? JSON.parse(searchParams.get("package")!)
    : null;

  return (
    <div>
      <BookingForm selectedPackage={selectedPackage} />
    </div>
  );
};

export default BookingPage;
