import { Button, TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Subscribe() {
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
    </div>
  );
}

export default Subscribe;
