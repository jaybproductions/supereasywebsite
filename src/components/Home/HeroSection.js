import React from "react";
import { ReactComponent as HeroImage } from "../../images/HeroImage.svg";
import { Button } from "@material-ui/core";

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="left-side">
        <h1 className="hero-text">
          Make Websites a Breeze with SuperEasyWebsite
        </h1>
        <p>
          Give us your design information and let us make your dream website a
          reality in no time.
        </p>
        <Button variant="contained" color="secondary">
          Get Started
        </Button>
      </div>
      <div className="right-side">
        <HeroImage />
      </div>
    </div>
  );
}

export default HeroSection;
