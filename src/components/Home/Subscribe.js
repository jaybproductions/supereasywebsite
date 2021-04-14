import { Button } from "@material-ui/core";
import React from "react";

function Subscribe() {
  return (
    <div className="subscribe">
      <div className="subscribe-text">
        <h3>Subscribe Now for Get Special Features!</h3>
        <p>Let's subscribe with us and find the fun.</p>
      </div>

      <div className="subscribe-button">
        <Button variant="contained" color="secondary">
          Subscribe Now
        </Button>
      </div>
    </div>
  );
}

export default Subscribe;
