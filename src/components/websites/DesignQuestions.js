import React, { useContext, useEffect, useState } from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import validateDesignForm from "../../validators/validateDesignForm";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import SendEmail from "../SendEmail";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const DesignQuestions = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const INITIAL_VALUES = {
    businessName: "",
    currentWebsite: "",
    references: "",
    colors: "",
    fonts: "",
    comments: "",
  };

  useEffect(() => {
    if (!user) return;
    getUser();
  }, [user]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    setUserData(docRef.data());
  };
  const submitDesign = async () => {
    const {
      businessName,
      currentWebsite,
      references,
      colors,
      fonts,
      comments,
    } = values;
    console.log(businessName);
    if (!user) {
      console.log("waiting to connect");
    } else {
      const updateRef = await firebase.db.collection("users").doc(user.uid);
      updateRef.update(
        {
          stepStatus: "pending",
          projectStatus: "Waiting on Design Question Approval",
        },
        { merge: true }
      );
      await firebase.db
        .collection("websites")
        .doc(user.uid)
        .update(
          {
            designQuestions: {
              businessName: businessName,
              currentWebsite: currentWebsite,
              references: references,
              colors: colors,
              fonts: fonts,
              comments: comments,
            },
          },
          { merge: true }
        );
      toast.success(
        "Thank you for submitting design questions. Please wait for approval to move to next step..."
      );
      getUser();

      const templateParams = {
        client: user.displayName,
        businessName: values.businessName,
        currentWebsite: values.currentWebsite,
        references: values.references,
        colors: values.colors,
        fonts: values.fonts,
        comments: values.comments,
      };
      emailjs.send("service_9dpngmi", "template_ztr2vif", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    }
  };

  const { handleChange, handleSubmit, values, isSubmitting } = useForm(
    INITIAL_VALUES,
    validateDesignForm,
    submitDesign
  );

  return (
    <div className="design-questions">
      {userData && (
        <>
          {userData.stepStatus === "started" ? (
            <>
              {" "}
              <Card>
                <CardContent>
                  <form
                    style={{ padding: "10px", width: "50%", margin: "auto" }}
                    id="design"
                  >
                    <TextField
                      name="businessName"
                      variant="outlined"
                      label="Business Name"
                      onChange={handleChange}
                      fullWidth
                    />
                    <br /> <div style={{ paddingTop: "15px" }} />
                    <TextField
                      name="currentWebsite"
                      variant="outlined"
                      label="Current Website Address"
                      onChange={handleChange}
                      fullWidth
                    />
                    <br /> <br />
                    <TextField
                      name="references"
                      variant="outlined"
                      label="References"
                      onChange={handleChange}
                      fullWidth
                    />
                    <br /> <br />
                    <TextField
                      name="fonts"
                      variant="outlined"
                      label="Fonts"
                      onChange={handleChange}
                      fullWidth
                    />
                    <br />
                    <br />
                    <div style={{ display: "inline", paddingTop: "15px" }} />
                    <TextField
                      name="colors"
                      variant="outlined"
                      label="Colors"
                      onChange={handleChange}
                      fullWidth
                    />
                    <br /> <br />
                    <TextField
                      variant="outlined"
                      name="comments"
                      label="Comments"
                      onChange={handleChange}
                      multiline
                      rows={4}
                      maxRows={8}
                      fullWidth
                    />
                    <br /> <br />
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>{" "}
            </>
          ) : (
            <>Thank you for submitting, please wait for approval. </>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default DesignQuestions;
