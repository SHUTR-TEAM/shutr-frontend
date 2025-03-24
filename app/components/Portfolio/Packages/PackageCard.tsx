// "use client";

// import { Packages } from "../../../redux/types/portfolio.types";
// import styles from "../styles/PackageCard.module.css";

// interface PackageCardProps {
//   package: Packages;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// export default function PackageCard({ package: pkg, onEdit, onDelete }: PackageCardProps) {
//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <h2>{pkg.title}</h2>
//         <div className={styles.price}>${pkg.price}</div>
//       </div>
//       <p className={styles.description}>{pkg.description}</p>
//       <ul className={styles.details}>
//         {pkg.details.map((detail) => (
//           <li key={detail.id}>{detail.text}</li>
//         ))}
//       </ul>
//       <div className={styles.actions}>
//         <button className={styles.editButton} onClick={onEdit}>
//           Edit
//         </button>
//         <button className={styles.deleteButton} onClick={onDelete}>
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Package } from "../../../redux/types/portfolio.types";
import styles from "./PackageCard.module.css";

interface PackageCardProps {
  package: Package;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PackageCard({
  package: pkg,
  onEdit,
  onDelete,
}: PackageCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{pkg.title}</h3>
        <div className={styles.price}>${pkg.price}</div>
      </div>
      <p className={styles.description}>{pkg.description}</p>
      <ul className={styles.details}>
        {pkg.details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={onEdit}>
          Edit
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
