import styles from "./page.module.css";
import AboutUsSection from "./components/Home/AboutUsSection";
import HeroSection from "./components/Home/HeroSection";
import HowItWorksSection from "./components/Home/HowItWorksSection";
// import ReviewsSection from "./components/Home/ReviewsSection";
import TeamSection from "./components/Home/Team";
import FeatureSection from "./components/Home/FeaturesSection";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <AboutUsSection />
      <TeamSection />
      <FeatureSection />
      <HowItWorksSection />
      {/* <ReviewsSection /> */}
    </div>
  );
}
