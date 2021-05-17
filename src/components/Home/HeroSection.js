import React from "react";
import { ReactComponent as HeroImage } from "../../images/HeroImage.svg";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="left-side">
        <h1 className="hero-text">
          Make Websites a Breeze with Super Easy Website
        </h1>
        <p>
          Give us your design information and let us make your dream website a
          reality in no time.
        </p>
        <div className="sign-up">
          <TextField
            variant="outlined"
            placeholder="Email"
            style={{
              maxWidth: "70%",

              minWidth: "70%",
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            to="/checkout"
            component={Link}
            style={{
              maxHeight: "54px",
              minHeight: "54px",
            }}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="right-side">
        <HeroImage />
      </div>
    </div>
  );
}

export default HeroSection;
