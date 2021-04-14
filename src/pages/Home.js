import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";
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
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = await firebase.db.collection("users").doc(user.uid).get();
      const userData = docRef.data();
      setUserData(userData);
    }
  };
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
