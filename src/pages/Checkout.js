import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import CheckoutStepper from "../components/Checkout/CheckoutStepper";
import CheckoutContext from "../contexts/CheckoutContext";
import Package from "../components/Home/Package";
import { Link } from "react-router-dom";
import {
  diy,
  starter,
  basic,
  intermediate,
  advanced,
  enterprise,
} from "../components/Home/packageDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
    width: "100%",
  },
  paper: {
    height: 300,
    width: 300,
    margin: "auto",

    textAlign: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Checkout = () => {
  const classes = useStyles();
  const { packageName } = useParams();
  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);

  useEffect(() => {
    if (packageName !== "select") {
      setCheckoutInfo((previousValues) => ({
        ...previousValues,

        selectedPackage: packageName,
      }));
    }
  }, [packageName]);

  if (packageName === "select") {
    return (
      <div className="package-selector">
        <div
          className="heading"
          style={{ padding: "30px", textAlign: "center" }}
        >
          <h4>To get started, please select a package from the list below.</h4>
          <Link to="/home" style={{ textAlign: "center" }}>
            Back to Home
          </Link>
        </div>

        <div className="packages">
          <Package
            title="DIY"
            features={diy.features}
            price={diy.price}
            link="diy"
            type="checkout"
          />
          <Package
            title="Starter"
            features={starter.features}
            price={starter.price}
            link="starter"
            type="checkout"
          />
          <Package
            title="Basic"
            features={basic.features}
            price={basic.price}
            link="basic"
            type="checkout"
          />
          <Package
            title="Intermediate"
            features={intermediate.features}
            price={intermediate.price}
            link="intermediate"
            type="checkout"
          />
          <Package
            title="Advanced"
            features={advanced.features}
            price={advanced.price}
            link="advanced"
            type="checkout"
          />
          <Package
            title="Enterprise"
            features={enterprise.features}
            price={enterprise.price}
            link="enterprise"
            type="checkout"
          />
        </div>
        <div className="disclaimer">
          *The price for each package may vary if additional features are
          requested. *These prices do not include the cost for monthly hosting.
          *The package you choose in the beginning doesn’t have to be the final
          package that is built for you. If we need to modify your package after
          learning more about your needs (before, during, or after the design
          phase) we can modify your package accordingly based on the final
          version of your website.
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <div
          className="stepper"
          style={{
            paddingBottom: "100px",
            paddingTop: "20px",
            width: "75%",
            margin: "auto",
          }}
        >
          <CheckoutStepper />
        </div>
      </div>
    );
  }
};

export default Checkout;
