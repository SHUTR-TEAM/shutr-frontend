"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./packages.module.css";
import { AppDispatch, RootState } from "@/app/redux/store";
import {
  /*getPackagesByPhotographer,*/ getPackagesByPortfolio,
  postPackage,
} from "@/app/redux/features/portfolio";
import PackageCard from "./PackageCard";
import PackageEditModal from "./PackageEditModal";
import router from "next/router";
import { Edit2 } from "lucide-react";
import { usePathname } from "next/navigation";

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
  },
];

const Packages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const participantId = pathname.split("/").pop();

  // Fetch packages from Redux on mount
  useEffect(() => {
    if (participantId) {
      dispatch(getPackagesByPortfolio({ portfolioId: participantId }));
    }
  }, [dispatch, participantId]);

  // Get Redux state
  const activePackages = useSelector(
    (state: RootState) => state.portfolio.activePackages
  );

  // Use Redux data if available; otherwise, use hardcoded data
  const packagesData = Array.isArray(activePackages?.data)
    ? activePackages.data
    : hardcodedPackages;

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

  const handleSave = async (pkg: Package) => {
    try {
      if (participantId) {
        const result = await dispatch(
          postPackage({
            portfolio_id: participantId,
            title: pkg.title,
            description: pkg.description,
            price: pkg.price,
            details: pkg.details,
          })
        ).unwrap();

        console.log("Package created:", result);

        // Update local state with new package
        setPackagesState((prev) => [
          ...prev,
          { ...pkg, id: result.package_id },
        ]);
      }
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
        <h2>Packages</h2>
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
  );
};

export default Packages;
