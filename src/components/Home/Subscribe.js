import { Button, TextField } from "@material-ui/core";
import React, { useContext } from "react";
import CheckoutContext from "../../contexts/CheckoutContext";
import { Link } from "react-router-dom";

function Subscribe() {
  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);
  const handleChange = (e) => {
    setCheckoutInfo((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="subscribe">
      <div className="subscribe-text">
        <h3>Sign Up Now to Get Started!</h3>
        <p>Let's subscribe with us and find the fun.</p>
      </div>

      <div className="subscribe-button">
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
    </div>
  );
}

export default Subscribe;
