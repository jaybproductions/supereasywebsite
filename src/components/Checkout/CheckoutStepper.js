import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DesignQuestions from "./DesignQuestions";
import UserContext from "../../contexts/UserContext";
import BasicInfo from "./BasicInfo";
import BusinessInfo from "./BusinessInfo";
import CheckoutContext from "../../contexts/CheckoutContext";
import { toast, ToastContainer } from "react-toastify";
import FinalCheckout from "./FinalCheckout";
import { Link } from "react-router-dom";
import { AddNewUser } from "../../utils/UpdateUserDetails";
import { AddNewLead, UpdateLead } from "../../utils/UpdateUserDetails";
import { SendEmail } from "../../utils/SendEmail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic Information",
    "Business Information",
    "Design Questions",
    "Checkout / Account Creation",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <BasicInfo />;
    case 1:
      return <BusinessInfo />;
    case 2:
      return <DesignQuestions />;
    case 3:
      return <FinalCheckout />;

    default:
      return "Unknown stepIndex";
  }
}

export default function CheckoutStepper({ type }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const { checkoutInfo } = useContext(CheckoutContext);

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNext = async () => {
    if (!checkoutInfo.email) {
      toast.error("Email is required");
      return;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(checkoutInfo.email)
    ) {
      toast.error("Your email is invalid.");
      return;
    }

    if (!checkoutInfo.password) {
      toast.error("Password is required");
      return;
    }
    if (activeStep === 0) {
      const leadDoc = {
        email: checkoutInfo.email,
        firstName: checkoutInfo.firstName,
        lastName: checkoutInfo.lastName,
        password: checkoutInfo.password,
      };

      await AddNewLead(leadDoc);
    } else {
      const updatedLeadDoc = {
        ...checkoutInfo,
      };
      await UpdateLead(updatedLeadDoc);
    }
    if (activeStep === 1) {
      if (!checkoutInfo.businessName) {
        toast.error("Business Name is Required");
        return;
      }
    }
    console.log(checkoutInfo);
    if (activeStep === steps.length - 1) {
      await AddNewUser(checkoutInfo);
      const content = "Thank you for signing up for Super Easy Website.";
      await SendEmail(content, checkoutInfo.email);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(checkoutInfo);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div
            className="instructions"
            style={{
              display: "flex",
              height: "40vh",
              width: "100%",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography className={classes.instructions}>
              “Great Job” We have received all of the information we need at
              this time to set up your account and begin the process of building
              your website. Check your email for next steps, or click{" "}
              <Link to="/dashboard">here</Link> to Log In to your Dashboard.
              <br />
              <br />
              <strong>Thank you for signing up for Super Easy Website!</strong>
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, userData)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
}
