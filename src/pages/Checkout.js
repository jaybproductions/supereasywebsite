import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import CheckoutStepper from "../components/Checkout/CheckoutStepper";

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
};

export default Checkout;
