import CategorySection from "../components/Search/CategorySection";
import SearchBox from "../components/Search/SeacrhBox";
import styles from "./page.module.css";

export default function Search() {
  return (
    <div className={styles.Container}>
      <div>
        <CategorySection />
      </div>
      <div>
        <div>
          <SearchBox />
        </div>
      </div>
    </div>
  );
}
