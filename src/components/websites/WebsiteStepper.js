import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DesignQuestions from "./DesignQuestions";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import HostingOptions from "./HostingOptions";
import MockupLink from "./MockupLink";

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
    "Fill Out Website Questionarre",
    "Choose Hosting Option",
    "Mockup Approval",
    "Final Design and Testing",
    "Launch and Live!",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <DesignQuestions />;
    case 1:
      return <HostingOptions />;
    case 2:
      return <MockupLink />;
    case 3:
      return "This is where final testing will go";
    case 4:
      return "This is where Launch and live will go";
    default:
      return "Unknown stepIndex";
  }
}

export default function WebsiteStepper({ type }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    console.log(user.uid);
    handleInitial();
  }, [user]);

  const handleInitial = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();

    setActiveStep(docRef.data().currentStep);
    if (docRef.data().stepStatus === "approved") {
      handleNext();
      const updateRef = firebase.db.collection("users").doc(user.uid);
      updateRef.update(
        {
          currentStep: activeStep + 1,
          stepStatus: "started",
        },
        { merge: true }
      );
    }
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
              {getStepContent(activeStep)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
