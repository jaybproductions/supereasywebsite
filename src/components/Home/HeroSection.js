import React, { useContext } from "react";
import { ReactComponent as HeroImage } from "../../images/HeroImage.svg";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckoutContext from "../../contexts/CheckoutContext";

function HeroSection() {
  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);
  const handleChange = (e) => {
    setCheckoutInfo((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };
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
            name="email"
            onChange={handleChange}
            value={checkoutInfo.email}
            style={{
              maxWidth: "70%",

              minWidth: "70%",
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            to="/checkout/select"
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
