import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Basic } from "../../images/Basic.svg";
import { Button, CardContent, Grid, Card } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import CheckoutContext from "../../contexts/CheckoutContext";
import Package from "../Home/Package";
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
              <Package
                image={<Basic />}
                type="checkout"
                features={features}
                title="Basic Plan"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default FinalCheckout;
