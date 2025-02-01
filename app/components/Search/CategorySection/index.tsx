import styles from "./index.module.css";

export default function CategorySection() {
    return (
      <div className={styles.container}>
        {/* Sidebar Filters */}
        <aside className={styles.filters}>
          <h3>Filters</h3>
  
          {/* Style Filter */}
          <div className={styles.filterGroup}>
            <h4>Style</h4>
            <div className={styles.filterButtons}>
              <button>Wedding</button>
              <button>Portrait</button>
              <button>Wildlife</button>
              <button>Videography</button>
            </div>
          </div>
  
          {/* Price Range Filter */}
          <div className={styles.filterGroup}>
            <h4>Price Range</h4>
            <div className={styles.priceRange}>
              <input type="number" placeholder="Min" />
              <span className={styles.rangeSeparator}>to</span>
              <input type="number" placeholder="Max" />
            </div>
          </div>
  
          {/* Availability Filter */}
          <div className={styles.filterGroup}>
            <h4>Availability</h4>
            <input type="date" />
          </div>
  
          {/* Experience Level Filter */}
          <div className={styles.filterGroup}>
            <h4>Experience Level</h4>
            <div className={styles.filterButtons}>
              <button>Beginner (&lt;1 year experience)</button>
              <button>Intermediate (1-3 year experience)</button>
              <button>Expert (3+ year experience)</button>
            </div>
          </div>
        </aside>
      </div>
    );
  }
  