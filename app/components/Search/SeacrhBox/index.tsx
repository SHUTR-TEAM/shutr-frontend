import styles from "./index.module.css";
import { IoSearch } from "react-icons/io5";

export default function SearchBox() {
    return (
        <div className={styles["search-bar-container"]}>
            <div className={styles["search-box"]}>
                <IoSearch className={styles["search-icon"]} />
                <input
                    type="text"
                    className={styles["search-input"]}
                    placeholder="Search"
                />
            </div>
            <div className={styles["sort-by-container"]}>
                <label htmlFor="sort-by" className={styles["sort-by-label"]}>
                    Sort By :
                </label>
                <select id="sort-by" className={styles["search-dropdown"]}>
                    <option value="relevant">Most relevant</option>
                    <option value="recent">Most recent</option>
                    <option value="popular">Most popular</option>
                </select>
            </div>
        </div>
    );
}

