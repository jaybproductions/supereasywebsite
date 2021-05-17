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
        <Package
          title="DIY"
          features={diy.features}
          price={diy.price}
          link="diy"
        />
        <Package
          title="Starter"
          features={starter.features}
          price={starter.price}
          link="starter"
        />
        <Package
          title="Basic"
          features={basic.features}
          price={basic.price}
          link="basic"
        />
        <Package
          title="Intermediate"
          features={intermediate.features}
          price={intermediate.price}
          link="intermediate"
        />
        <Package
          title="Advanced"
          features={advanced.features}
          price={advanced.price}
          link="advanced"
        />
        <Package
          title="Enterprise"
          features={enterprise.features}
          price={enterprise.price}
          link="enterprise"
        />
      </div>
      <div className="disclaimer">
        *The price for each package may vary if additional features are
        requested. *These prices do not include the cost for monthly hosting.
        *The package you choose in the beginning doesn’t have to be the final
        package that is built for you. If we need to modify your package after
        learning more about your needs (before, during, or after the design
        phase) we can modify your package accordingly based on the final version
        of your website.
      </div>
    </div>
  );
}

export default PackageSelection;
