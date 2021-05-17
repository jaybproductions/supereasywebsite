import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Basic } from "../../images/Basic.svg";
import { Button, CardContent, Grid, Card } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import CheckoutContext from "../../contexts/CheckoutContext";
import Package from "../Home/Package";
import {
  diy,
  starter,
  basic,
  intermediate,
  advanced,
  enterprise,
} from "../Home/packageDetails";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const FinalCheckout = () => {
  const { checkoutInfo } = useContext(CheckoutContext);

  const features = [
    "5-10 Pages",
    "e-Commerce Available",
    "Content Creation on Request",
    "Unlimited Revisions",
    "Content Updates Post Launch",
  ];

  const handleSelectedPackage = () => {
    switch (checkoutInfo.selectedPackage) {
      case "diy":
        return (
          <Package
            image={<Basic />}
            type="final"
            features={diy.features}
            price={diy.price}
            title={diy.title}
          />
        );
      case "starter":
        return (
          <Package
            image={<Basic />}
            type="final"
            features={starter.features}
            price={starter.price}
            title={starter.title}
          />
        );
      case "basic":
        return (
          <Package
            image={<Basic />}
            type="final"
            features={basic.features}
            price={basic.price}
            title={basic.title}
          />
        );
      case "intermediate":
        return (
          <Package
            image={<Basic />}
            type="final"
            features={intermediate.features}
            price={intermediate.price}
            title={intermediate.title}
          />
        );
      case "advanced":
        return (
          <Package
            image={<Basic />}
            type="final"
            features={advanced.features}
            price={advanced.price}
            title={advanced.title}
          />
        );
      case "enterprise":
        return (
          <Package
            image={<Basic />}
            type="final"
            features={enterprise.features}
            price={enterprise.price}
            title={enterprise.title}
          />
        );

      default:
        return "Something went wrong, it looks like you never selected a package.";
    }
  };

  return (
    <div className="final-checkout">
      <h5 style={{ padding: "20px", paddingBottom: "40px" }}>
        Please review all information below and click "finish" to complete your
        account registration.
      </h5>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Basic Information</h4>
              <ul>
                <li>First Name: {checkoutInfo.firstName}</li>
                <li>Last Name: {checkoutInfo.lastName}</li>
                <li>Phone Number: {checkoutInfo.phone}</li>
                <li>Email: {checkoutInfo.email}</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Business Information</h4>
              <ul>
                <li>Business Name: {checkoutInfo.businessName}</li>
                <li>Business Address: {checkoutInfo.address}</li>
                <li>Current Website: {checkoutInfo.domain}</li>
                <li>Email: {checkoutInfo.email}</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Design Selections</h4>
              <ul>
                <li>Design References: {checkoutInfo.references}</li>
                <li>Fonts: {checkoutInfo.fonts}</li>
                <li>Colors: {checkoutInfo.colors}</li>
                <li>Email: {checkoutInfo.email}</li>
                <li>
                  Pages:{" "}
                  {checkoutInfo.pageArr.map((page) => {
                    return page + ", ";
                  })}
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Package Selection</h4>
              {handleSelectedPackage()}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default FinalCheckout;
