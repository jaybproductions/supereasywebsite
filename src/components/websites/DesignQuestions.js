import React, { useContext, useEffect, useState } from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import validateDesignForm from "../../validators/validateDesignForm";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import {
  UpdateDesignQuestionsInDB,
  UpdateStepStatusInDB,
} from "../utils/UpdateUserDetails";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const DesignQuestions = ({ userData }) => {
  const { user } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const INITIAL_VALUES = {
    businessName: "",
    currentWebsite: "",
    references: "",
    colors: "",
    fonts: "",
    comments: "",
    logo: "",
  };

  const submitDesign = async () => {
    if (!user)
      return toast.error(
        "There has been an error. Please try logging in again."
      );
    const {
      businessName,
      currentWebsite,
      references,
      colors,
      fonts,
      comments,
    } = values;

    const updatedStepStatus = {
      stepStatus: "pending",
      projectStatus: "Waiting on Design Question Approval",
    };
    await UpdateStepStatusInDB(user.uid, updatedStepStatus);

    const updatedDoc = {
      businessName: businessName,
      currentWebsite: currentWebsite,
      references: references,
      colors: colors,
      fonts: fonts,
      comments: comments,
    };

    await UpdateDesignQuestionsInDB(user.uid, updatedDoc);
    setSubmitted(true);

    toast.success(
      "Thank you for submitting design questions. Please wait for approval to move to next step..."
    );

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
  };

  const uploadLogo = async (event) => {
    console.log(event.target.files[0].name);
    const fileName = event.target.files[0].name;
    const fileToUpload = event.target.files[0];
    const storage = firebase.app.storage();
    const ref = storage.ref();
    const imagesRef = ref.child(`logos/${user.uid}/${fileName}`);

    await imagesRef.put(fileToUpload).then((snapshot) => {
      //get download url
      console.log("file has been uploaded");
      //add download url to designQuestions
    });

    const url = await storage
      .ref(`logos/${user.uid}/${fileName}`)
      .getDownloadURL();
    console.log(url);
    firebase.db.collection("websites").doc(user.uid).update(
      {
        logo: url,
      },
      { merge: true }
    );
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
          {userData.stepStatus === "started" && submitted === false ? (
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
                    <p style={{ textAlign: "left" }}>Upload a Logo</p>
                    <TextField
                      name="logo"
                      variant="outlined"
                      type="file"
                      onChange={uploadLogo}
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
