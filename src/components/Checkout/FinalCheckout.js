import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as Basic } from "../../images/Basic.svg";
import { Button, CardContent, Grid, Card } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import CheckoutContext from "../../contexts/CheckoutContext";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const FinalCheckout = () => {
  const { checkoutInfo } = useContext(CheckoutContext);

  return (
    <div className="final-checkout">
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Basic Information</h4>
              All of the clients basic information will go here
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Business Information</h4>
              All of the clients business information will go here.
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Design Selections</h4>
              All of the clients design selections will go here.
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <h4>Package Selection</h4>
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
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default FinalCheckout;
