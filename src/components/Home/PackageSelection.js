import { Button } from "@material-ui/core";
import React from "react";
import { ReactComponent as Basic } from "../../images/Basic.svg";

function PackageSelection() {
  return (
    <div className="package-section">
      <div className="text-section">
        <h3>Choose your Package</h3>
        <p>
          Let's choose the package that is best for you and explore it happily
          and cheerfully.
        </p>
      </div>
      <div className="packages">
        <div className="package-container">
          <div className="package-one">
            <div className="package-img">
              <Basic />
            </div>
            <div className="package-title">Basic Plan</div>
            <div className="features-list">
              <ul>
                <li>1 Landing/Sales Page</li>
                <li>Free SSL Certificate</li>
                <li>You Provide Content</li>
                <li>Mobile Responsive</li>
              </ul>
            </div>
            <div className="price">Pricing</div>
            <div className="select-button">
              <Button variant="outlined" color="secondary">
                Select
              </Button>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="package-two">
            <div className="package-img">
              <Basic />
            </div>
            <div className="package-title">Standard Plan</div>
            <div className="features-list">
              <ul>
                <li>3-5 Pages</li>
                <li>Great for Startups</li>
                <li>Logo Creation on Request</li>
                <li>Unrivaled Support</li>
                <li>Another Feature Here</li>
              </ul>
            </div>
            <div className="price">Pricing</div>
            <div className="select-button">
              <Button variant="outlined" color="secondary">
                Select
              </Button>
            </div>
          </div>
        </div>
        <div className="package-container">
          <div className="package-three">
            <div className="package-img">
              <Basic />
            </div>
            <div className="package-title">Premium Plan</div>
            <div className="features-list">
              <ul>
                <li>5-10 Pages</li>
                <li>e-Commerce Available</li>
                <li>Content Creation on Request</li>
                <li>Unlimited Revisions</li>
                <li>Content Updates Post Launch</li>
                <li>Another Great Feature</li>
              </ul>
            </div>
            <div className="price">Pricing</div>
            <div className="select-button">
              <Button variant="contained" color="secondary">
                Select
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageSelection;
