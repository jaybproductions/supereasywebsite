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

function getStepContent(stepIndex, user) {
  switch (stepIndex) {
    case 0:
      return <DesignQuestions userData={user} />;
    case 1:
      return <HostingOptions userData={user} />;
    case 2:
      return <MockupLink userData={user} />;
    case 3:
      return <FinalDesign userData={user} />;
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
              {userData && getStepContent(activeStep, userData)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
