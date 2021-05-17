import { Button } from "@material-ui/core";
import React from "react";
import { ReactComponent as Basic } from "../../images/Basic.svg";
import { Link } from "react-router-dom";
import Package from "./Package";
import {
  diy,
  starter,
  basic,
  intermediate,
  advanced,
  enterprise,
} from "./packageDetails";

function PackageSelection() {
  return (
    <div className="package-section" id="pricing">
      <div className="text-section">
        <h3>Choose your Package</h3>
        <p>
          Let's choose the package that is best for you and explore it happily
          and cheerfully.
        </p>
      </div>
      <div className="packages">
        <Package title="DIY" features={diy.features} price={diy.price} />
        <Package
          title="Starter"
          features={starter.features}
          price={starter.price}
        />
        <Package title="Basic" features={basic.features} price={basic.price} />
        <Package
          title="Intermediate"
          features={intermediate.features}
          price={intermediate.price}
        />
        <Package
          title="Advanced"
          features={advanced.features}
          price={advanced.price}
        />
        <Package
          title="Enterprise"
          features={enterprise.features}
          price={enterprise.price}
        />
      </div>
    </div>
  );
}

export default PackageSelection;
