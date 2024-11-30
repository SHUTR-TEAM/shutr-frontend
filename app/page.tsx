// import styles from "./page.module.css";

import AboutUsSection from "./components/Home/AboutUsSection";
import HeroSection from "./components/Home/HeroSection";
import HowItWorksSection from "./components/Home/HowItWorksSection";
import ReviewsSection from "./components/Home/ReviewsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <ReviewsSection />
      <AboutUsSection />
    </div>
  );
}
