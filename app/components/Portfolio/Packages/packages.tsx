// "use client";

// // import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./Packages.module.css";
// import { AppDispatch, RootState } from "@/app/redux/store";
// import { getPackagesByPhotographer } from "@/app/redux/features/portfolio";
// import PackageCard from "./PackageCard";
// import PackageEditModal from "./PackageEditModal";

// interface Package {
//   id: string;
//   title: string;
//   price: string;
//   description: string;
//   details: string[];
//   // packageType: string;
// }

// const Packages = () => {
//   const dispatch = useDispatch<AppDispatch>();


//    // Fetch packages on mount
//    useEffect(() => {
//     dispatch(getPackagesByPhotographer({ participantId: "67db026680a585e2d2cd7439" }));
//   }, [dispatch]);
  
//   // const router = useRouter();

//   // Fetch packages from Redux
//   const activePackages = useSelector((state: RootState) => state.portfolio.activePackages);

  
//   // const packagesData = activePackages?.data ?? [];

//   const packagesData = Array.isArray(activePackages?.data) ? activePackages.data : [];
  
//   // const [packagesState, setPackagesState] = useState<Package[]>(packagesData);


//   const [packagesState, setPackagesState] = useState<Package[]>(Array.isArray(packagesData) ? packagesData : []);


//   // State for managing packages
//   // const [packagesState, setPackagesState] = useState<Package[]>(packagesData);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingPackage, setEditingPackage] = useState<Package | null>(null);

 

//   useEffect(() => {
//     setPackagesState(packagesData);
//   }, [packagesData]);

//   const handleEdit = (pkg: Package) => {
//     setEditingPackage(pkg);
//     setIsModalOpen(true);
//   };

//   const handleAdd = () => {
//     setEditingPackage(null);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setPackagesState((prev) => prev.filter((pkg) => pkg.id !== id));
//   };

//   const handleSave = (pkg: Package) => {
//     setPackagesState((prev) =>
//       editingPackage ? prev.map((p) => (p.id === pkg.id ? pkg : p)) : [...prev, { ...pkg, id: Date.now().toString() }]
//     );
//     setIsModalOpen(false);
//   };

//   // const handleBookNow = () => {
//   //   router.push(`/booking`);
//   // };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h1>Packages</h1>
//         <button className={styles.addButton} onClick={handleAdd}>
//           Add Package
//         </button>
//       </div>
//       <div className={styles.packageGrid}>
//         {packagesState.map((pkg) => (
//           <PackageCard
//             key={pkg.id}
//             package={pkg}
//             onEdit={() => handleEdit(pkg)}
//             onDelete={() => handleDelete(pkg.id)}
//           />
//         ))}
//       </div>
//       <PackageEditModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//         package={editingPackage}
//       />
      
//     </div>
//   );
// };

// export default Packages;



"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Packages.module.css";
import { AppDispatch, RootState } from "@/app/redux/store";
import { /*getPackagesByPhotographer,*/ getPackagesByPortfolio, postPackage } from "@/app/redux/features/portfolio";
import PackageCard from "./PackageCard";
import PackageEditModal from "./PackageEditModal";
import router from "next/router";
import { Edit2 } from "lucide-react";

interface Package {
  id: string;
  title: string;
  price: string;
  description: string;
  details: string[];
}

const hardcodedPackages: Package[] = [
  {
    id: "1",
    title: "Basic Session",
    price: "150",
    description: "1-hour photo session with 10 edited photos",
    details: ["1 hour of coverage", "10 edited photos", "Digital delivery"],
  // },
  // {
  //   id: "2",
  //   title: "Premium Package",
  //   price: "300",
  //   description: "2-hour photo session with 25 edited photos",
  //   details: [
  //     "2 hours of coverage",
  //     "25 edited photos",
  //     "Digital delivery",
  //     "Print release",
  //   ],
   },
];

const Packages = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch packages from Redux on mount
  useEffect(() => {
    // dispatch(getPackagesByPhotographer({ participantId: "67dd71aee5948704445e32f0" }));
    dispatch(getPackagesByPortfolio({ portfolioId : "67ab65b24cb48a7c886d0dfa" }));
  }, [dispatch]);

  // Get Redux state
  const activePackages = useSelector((state: RootState) => state.portfolio.activePackages);


  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",activePackages.data);

  // Use Redux data if available; otherwise, use hardcoded data
  const packagesData = Array.isArray(activePackages?.data) ? activePackages.data : hardcodedPackages;

  // Local state for packages
  const [packagesState, setPackagesState] = useState<Package[]>(packagesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  // Update local state when Redux data updates
  useEffect(() => {
    setPackagesState(packagesData);
  }, [packagesData]);

  // Handlers
  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPackagesState((prev) => prev.filter((pkg) => pkg.id !== id));
  };

  // const handleSave = (pkg: Package) => {
  //   setPackagesState((prev) =>
  //     editingPackage ? prev.map((p) => (p.id === pkg.id ? pkg : p)) : [...prev, { ...pkg, id: Date.now().toString() }]
  //   );
  //   setIsModalOpen(false);
  // };

  // const handleSave = async (pkg: Package) => {
  //   try {
  //     const result = await dispatch(postPackage(pkg)).unwrap(); // Dispatch Redux action to send data
  //     console.log("Package created:", result);

  //     // dispatch(getPackagesByPhotographer({ participantId: "67db026680a585e2d2cd7439" })); // Fetch updated packages
  
  //     // If success, update local state with new package
  //     setPackagesState((prev) => [...prev, { ...pkg, id: result.package_id }]);
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     // console.error("Error creating package:", error);
  //     console.log("Error creating package:", error);

  //   }
  // };

  const handleSave = async (pkg: Package) => {
    try {
      const result = await dispatch(
        postPackage({
          //  userID: "67dd71aee5948704445e32f0", // Add the required userID
          portfolio_id: "67ab65b24cb48a7c886d0dfa",
          title: pkg.title,
          description: pkg.description,
          price: pkg.price,
          details: pkg.details,
        })
      ).unwrap();
  
      console.log("Package created:", result);
  
      // Update local state with new package
      setPackagesState((prev) => [...prev, { ...pkg, id: result.package_id }]);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error creating package:", error);
    }
  };
  

    const handleBookNow = () => {
     router.push(`/booking`);
    };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Packages</h1>
        <button className={styles.addButton} onClick={handleAdd}>
        <Edit2 size={20} />

          {/* Add Package */}
        </button>

      </div>
      <div className={styles.packageGrid}>
        {packagesState.map((pkg) => (
          <PackageCard
            key={pkg.id}
            package={pkg}
            onEdit={() => handleEdit(pkg)}
            onDelete={() => handleDelete(pkg.id)}
          />
        ))}
      </div>
      <PackageEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        package={editingPackage}
      />

    {packagesState.length > 0 && (
      <button className={styles.bookButton} onClick={handleBookNow}>
        Book Now
      </button>
    )} 

    </div>

    // {packagesState.length > 0 && (
    //   <button className={styles.bookButton} onClick={handleBookNow}>
    //     Book Now
    //   </button>
    // )} 
    
    
  );
};

export default Packages;

