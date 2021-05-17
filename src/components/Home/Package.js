import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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
        <div className="price">
          {price ? (
            price
          ) : (
            <span style={{ fontSize: "16px", fontWeight: "400" }}>
              {" "}
              Request Quote
            </span>
          )}
        </div>
        <div className="spacer"></div>
        <div className="select-button">
          {type === "final" ? (
            ""
          ) : (
            <Button
              variant="contained"
              color="secondary"
              to={`/checkout/${link}`}
              component={Link}
            >
              Select
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Package;
