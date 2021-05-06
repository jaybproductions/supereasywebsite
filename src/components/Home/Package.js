import React from "react";
import { Button } from "@material-ui/core";

function Package({ image, features, link, price }) {
  return (
    <div className="package-container">
      <div className="package-one">
        <div className="package-img">{image}</div>
        <div className="package-title">Basic Plan</div>
        <div className="features-list">{features}</div>
        <div className="price">Pricing</div>
        <div className="select-button">
          <Button variant="outlined" color="secondary">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Package;
