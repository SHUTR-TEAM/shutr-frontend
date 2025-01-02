import Card from "../components/Search/Card";
import CategorySection from "../components/Search/CategorySection";
import SearchBox from "../components/Search/SeacrhBox";
// import SearchBox from "../components/Search/SeacrhBox";
// import SmallPortfolio from "../components/Search/SmallPortfolio";
import styles from "./page.module.css";

const data = [
  {
    id: 1,
    images: ["/pic.png", "/pic.png", "/pic.png"],
    name: "John Doe",
    price: 8000,
    tags: ["Wedding", "Portrait"],
    location: "Greenwich Court",
    reviews: 8,
    rating: 4.5,
  },
  {
    id: 2,
    images: ["/pic.png", "/pic.png", "/pic.png"],
    name: "John Doe",
    price: 8000,
    tags: ["Wedding", "Portrait"],
    location: "Greenwich Court",
    reviews: 8,
    rating: 4.5,
  },
  {
    id: 3,
    images: ["/pic.png", "/pic.png", "/pic.png"],
    name: "John Doe",
    price: 8000,
    tags: ["Wedding", "Portrait"],
    location: "Greenwich Court",
    reviews: 8,
    rating: 4.5,
  },
  {
    id: 4,
    images: ["/pic.png", "/pic.png", "/pic.png"],
    name: "John Doe",
    price: 8000,
    tags: ["Wedding", "Portrait"],
    location: "Greenwich Court",
    reviews: 8,
    rating: 4.5,
  },
  {
    id: 5,
    images: ["/pic.png", "/pic.png", "/pic.png"],
    name: "John Doe",
    price: 8000,
    tags: ["Wedding", "Portrait"],
    location: "Greenwich Court",
    reviews: 8,
    rating: 4.5,
  },
  {
    id: 6,
    images: ["/pic.png", "/pic.png", "/pic.png"],
    name: "John Doe",
    price: 8000,
    tags: ["Wedding", "Portrait"],
    location: "Greenwich Court",
    reviews: 8,
    rating: 4.5,
  },
];

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
        <div>
          {" "}
          <Card data={data} />
        </div>
      </div>
    </div>
  );
}
