"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Pagination.module.css";
import { AppDispatch, RootState } from "@/app/redux/store";
import { setPage, fetchFilteredResults } from "@/app/redux/features/searchSlice";

export default function Pagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { page, limit, total } = useSelector((state: RootState) => state.search);

  // Calculating total pages
  const totalPages = total && limit ? Math.ceil(total / limit) : 0;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      dispatch(fetchFilteredResults());
      // Scroll to top of the page smoothly when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // If there is only one page or no pages, pagination do not render
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      {/* Render page number buttons dynamically based on totalPages */}
      {Number.isInteger(totalPages) &&
        [...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`${styles.button} ${page === i + 1 ? styles.active : ""}`}
          >
            {i + 1}
          </button>
        ))}
    </div>
  );
}
