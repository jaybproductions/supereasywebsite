import React from "react";

import "./Home.css";
import FAQ from "../components/Home/FAQ";
import Questions from "../components/Home/Questions";
import HeroSection from "../components/Home/HeroSection";
import IconsSection from "../components/Home/IconsSection";
import FeaturesSection from "../components/Home/FeaturesSection";
import PackageSelection from "../components/Home/PackageSelection";
import BackedBy from "../components/Home/BackedBy";
import Testimonials from "../components/Home/Testimonials";
import Subscribe from "../components/Home/Subscribe";

const Home = () => {
  return (
    <>
      <div className="home">
        <HeroSection />
        <IconsSection />
        <FeaturesSection />
        <PackageSelection />
        <BackedBy />
        <Testimonials />
        <Subscribe />
      </div>

      <FAQ />
      <Questions />
    </>
  );
};

export default Home;
