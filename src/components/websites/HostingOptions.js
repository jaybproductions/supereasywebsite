import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import { Card, CardContent, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import SendEmail from "../SendEmail";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const HostingOptions = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [state, setState] = useState({
    basic: true,
    intermediate: false,
    advanced: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { basic, intermediate, advanced } = state;
  const error = [basic, intermediate, advanced].filter((v) => v).length > 1;
  useEffect(() => {
    if (!user) return;
    getUser();
  }, [user]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    setUserData(docRef.data());
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async () => {
    let selected;
    if (!user) {
      console.log("waiting to connect");
    } else {
      if (error) {
        console.log("error");
        toast.error("Please only select 1 option...");
        return;
      }
      console.log(state);
      for (const [key, value] of Object.entries(state)) {
        if (value === true) {
          console.log(key);
          selected = key;
        }
      }
      const updateRef = firebase.db.collection("users").doc(user.uid);
      await updateRef.update(
        {
          currentStep: userData.currentStep + 1,
          projectStatus: "Hosting Package Selected, Waiting on Mockup Creation",
        },
        { merge: true }
      );
      await firebase.db.collection("websites").doc(user.uid).update(
        {
          hosting: selected,
        },
        { merge: true }
      );
      console.log(selected);
      const templateParams = {
        content: `Customer has chosen their hosting package. They have selected: ${selected}`,
        to: "chris@btwebgroup.com",
      };
      emailjs.send("service_9dpngmi", "template_izthnsq", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      getUser();
      setSubmitted(true);
      toast.success("Thank you for choosing. Please refresh for next step...");
    }
  };
  return (
    <div className="hosting-options">
      <Card>
        <CardContent>
          <h4>Choose your hosting option.</h4>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={basic}
                    onChange={handleChange}
                    name="basic"
                  />
                }
                label="Basic"
              />
              <div style={{ textAlign: "left" }}>
                <ul>
                  <li>Budget Friendly</li>
                  <li>No integrated emails</li>
                  <li>Fully Managed by Client</li>
                </ul>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={intermediate}
                    onChange={handleChange}
                    name="intermediate"
                  />
                }
                label="Intermediate"
              />
              <div style={{ textAlign: "left" }}>
                <ul>
                  <li>Integrated Emails</li>
                  <li>Automatic Plugin Updates and Uptime Monitoring</li>
                  <li>Partially Managed by Client</li>
                </ul>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={advanced}
                    onChange={handleChange}
                    name="advanced"
                  />
                }
                label="Advanced"
              />
              <div style={{ textAlign: "left" }}>
                <ul>
                  <li>All features of intermediate</li>
                  <li>CDN and Caching for fastest speed available</li>
                  <li>Fully Managed by Us</li>
                </ul>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={submitted}
              >
                Submit
              </Button>
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default HostingOptions;
