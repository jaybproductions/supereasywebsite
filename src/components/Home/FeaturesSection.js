import React from "react";
import { ReactComponent as FeaturesImg } from "../../images/FeaturesImg.svg";

function FeaturesSection() {
  return (
    <div className="features" id="about">
      <div className="left-side">
        <FeaturesImg />
      </div>
      <div className="right-side">
        <h3>Just some of the features Super Easy Website Offers...</h3>
        <ul>
          <li>Fully Finished Website - Ready To Launch</li>
          <li>Mobile Responsive with Modern Design </li>
          <li>Got an Online Store? No problem. </li>
          <li>Start Your Online Business with a Flash</li>
        </ul>
      </div>
    </div>
  );
}

export default FeaturesSection;
