import React from "react";
import { Button } from "@material-ui/core";

function Package({ image, features, link, price, type, title }) {
  return (
    <div className="package-container">
      <div className="package-one">
        <div className="package-img">{image}</div>
        <div className="package-title">{title}</div>
        <div className="features-list">
          <ul>
            {features.map((feature) => (
              <li>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="price">{price}</div>
        <div className="spacer"></div>
        <div className="select-button">
          {type === "checkout" ? (
            ""
          ) : (
            <Button variant="contained" color="secondary">
              Select
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Package;
