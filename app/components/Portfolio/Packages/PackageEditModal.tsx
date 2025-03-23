"use client";

import { useState, useEffect } from "react";
import { Packages } from "../../../redux/types/portfolio.types";
import styles from "./PackageEditModal.module.css";

// interface PackageEditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (pkg: Packages) => void;
//   package: Packages | null;
// }

interface PackageEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (pkg: Packages) => void;  // Change to Package type
    package: Packages | null;         // Change to Package type
  }

export default function PackageEditModal({
  isOpen,
  onClose,
  onSave,
  package: editingPackage,
}: PackageEditModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState<string[]>([]);
  const [newDetail, setNewDetail] = useState("");

  useEffect(() => {
    if (editingPackage) {
      setTitle(editingPackage.title);
      setDescription(editingPackage.description);
      setPrice(editingPackage.price.toString());
      setDetails(editingPackage.details || []); // Ensure it's always an array
    } else {
      setTitle("");
      setDescription("");
      setPrice("");
      setDetails([]);
    }
  }, [editingPackage]);

  const handleAddDetail = () => {
    if (newDetail.trim()) {
      setDetails([...details, newDetail.trim()]);
      setNewDetail("");
    }
  };

  const handleRemoveDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packageData: Packages = {
      id: editingPackage?.id || Date.now().toString(),
      title,
      description,
      price: String(price),
      details, // This is now correctly an array of strings
    };
    onSave(packageData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{editingPackage ? "Edit Package" : "Add Package"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Details:</label>
            <div className={styles.detailInput}>
              <input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="Add a detail"
              />
              <button
                type="button"
                className={styles.addDetailButton}
                onClick={handleAddDetail}
              >
                +
              </button>
            </div>
            <ul className={styles.detailsList}>
              {details.map((detail, index) => (
                <li key={index}>
                  {detail}
                  <button
                    type="button"
                    onClick={() => handleRemoveDetail(index)}
                    className={styles.removeDetailButton}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
