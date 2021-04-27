import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DesignQuestions from "./DesignQuestions";
import UserContext from "../../contexts/UserContext";
import HostingOptions from "./HostingOptions";
import MockupLink from "./MockupLink";
import FinalDesign from "./FinalDesign";
import { GetUserDataFromFirebase } from "../utils/GetUserDetails";
import BasicInfo from "./BasicInfo";
import BusinessInfo from "./BusinessInfo";

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
      return <FinalDesign />;

    default:
      return "Unknown stepIndex";
  }
}

export default function WebsiteStepper({ type }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;
    handleGetCurrentStepFromUserData();
  }, [user]);

  const handleGetCurrentStepFromUserData = async () => {
    const userData = await GetUserDataFromFirebase(user.uid);
    setUserData(userData);
    setActiveStep(userData.currentStep);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
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
          </div>
        )}
      </div>
    </div>
  );
}
