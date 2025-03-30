import TopBanner from "@/components/home-page/TopBanner";
import Navbar from "@/components/home-page/Navbar";
import Hero from "@/components/home-page/Hero";
import Features from "@/components/home-page/Features";
import Statistics from "@/components/home-page/Statistics";
import CourseCategories from "@/components/home-page/CourseCategories";
import ExpertMentors from "@/components/home-page/ExpertMentors";
import Testimonials from "@/components/home-page/Testimonials";
import CallToAction from "@/components/home-page/CallToAction";
import Footer from "@/components/home-page/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <TopBanner />
      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <CourseCategories />
      <ExpertMentors />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
