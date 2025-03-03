"use client";

import { useRouter } from "next/navigation";

import styles from './Packages.module.css';



  interface Package {
    id: number;
    title: string;
    price: string;
    description: string;
    details: string[];
    packageType: string;
  }
  
  const Packages = () => {
    const router = useRouter();
  
    const packages: Package[] = [
      {
        id: 1,
        title: "Basic Session",
        price: "$150",
        description: "1-hour photo session with 10 edited photos",
        details: ["1 hour of coverage", "10 edited photos", "Digital delivery"],
        packageType: "basic",
      },
      {
        id: 2,
        title: "Premium Package",
        price: "$300",
        description: "2-hour photo session with 25 edited photos",
        details: [
          "2 hours of coverage",
          "25 edited photos",
          "Digital delivery",
          "Print release",
        ],
        packageType: "premium",
      },
      {
        id: 3,
        title: "Premium Package",
        price: "$300",
        description: "2-hour photo session with 25 edited photos",
        details: [
          "2 hours of coverage",
          "25 edited photos",
          "Digital delivery",
          "Print release",
        ],
        packageType: "premium",
      },
    ];
  
    const handleBookNow = (pkg: Package) => {
      // Use query params instead of React Router's 'state'
      router.push(`/booking?package=${pkg.packageType}`);
    };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Packages</h2>
      
      

      {packages.map((pkg) => (
        <div key={pkg.id} className={styles.packageCard}>
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
          <button
            className={styles.bookButton}
            onClick={() => handleBookNow(pkg)}
          >
            Book Now
          </button>
        </div>
        
      ))}

        


      
      
      <button className={styles.messageButton}>
        <span className={styles.icon}>&#128172;</span> Message Photographer
      </button>
    </div>
  );
};
export default Packages;



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./Packages.module.css";

// interface Package {
//   _id: string;  // MongoDB uses `_id` instead of `id`
//   title: string;
//   price: string;
//   description: string;
//   details: string[];  // Keep details as an array
//   package_type: string;
// }

// const Packages = () => {
//   const router = useRouter();
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         // const response = await fetch("http://localhost:8000/packages/"); // Update with your API URL
//         const response = await fetch("http://127.0.0.1:8000/packages/");
//         if (!response.ok) throw new Error("Failed to fetch packages");
        
//         const data: Package[] = await response.json();
//         setPackages(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const handleBookNow = (pkg: Package) => {
//     router.push(`/booking?package=${pkg.package_type}`);
//   };

//   if (loading) return <p>Loading packages...</p>;
//   if (error) return <p className={styles.error}>Error: {error}</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Packages</h2>

//       {packages.length > 0 ? (
//         packages.map((pkg) => (
//           <div key={pkg._id} className={styles.packageCard}>
//             <div className={styles.packageHeader}>
//               <h3 className={styles.packageTitle}>{pkg.title}</h3>
//               <span className={styles.packagePrice}>{pkg.price}</span>
//             </div>
//             <p className={styles.packageDescription}>{pkg.description}</p>
//             <ul className={styles.packageList}>
//               {pkg.details.map((detail, index) => (
//                 <li key={index}>{detail}</li>
//               ))}
//             </ul>
//             <button
//               className={styles.bookButton}
//               onClick={() => handleBookNow(pkg)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No packages available</p>
//       )}

//       <button className={styles.messageButton}>
//         <span className={styles.icon}>&#128172;</span> Message Photographer
//       </button>
//     </div>
//   );
// };

// export default Packages;
