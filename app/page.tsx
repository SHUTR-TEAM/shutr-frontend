import styles from "./page.module.css";
import AboutUsSection from "./components/Home/AboutUsSection";
import HeroSection from "./components/Home/HeroSection";
import HowItWorksSection from "./components/Home/HowItWorksSection";
// import ReviewsSection from "./components/Home/ReviewsSection";
import TeamSection from "./components/Home/Team";
import FeatureSection from "./components/Home/FeaturesSection";
import AnimatedSection from "./utils/AnimatedSection";

export default function Home() {
  return (
    <div className={styles.homePage}>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      <AnimatedSection>
        <AboutUsSection />
      </AnimatedSection>

      <AnimatedSection>
        <TeamSection />
      </AnimatedSection>

      <AnimatedSection>
        <FeatureSection />
      </AnimatedSection>

      <AnimatedSection>
        <HowItWorksSection />
      </AnimatedSection>

      {/* <AnimatedSection>
        <ReviewsSection />
      </AnimatedSection> */}
    </div>
  );
}
