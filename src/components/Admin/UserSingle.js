import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../firebase";
import { Button, Card, CardContent, TextField, Grid } from "@material-ui/core";
import { update } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const UserSingle = () => {
  const { project } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [mockupLink, setMockupLink] = useState("");
  useEffect(() => {
    getUser();
  }, [project]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(project).get();
    console.log(docRef.data());
    setSingleUser(docRef.data());
    setMockupLink(docRef.data().mockupLink);
  };

  const handleApprove = () => {
    if (!singleUser) {
      console.log("waiting to connect");
    } else {
      const updateRef = firebase.db.collection("users").doc(singleUser.id);
      updateRef.update(
        {
          stepStatus: "started",
          currentStep: singleUser.currentStep + 1,
        },
        { merge: true }
      );

      getUser();

      const templateParams = {
        content: "Your Design Questions have been approved",
        to: singleUser.email,
      };

      emailjs.send("service_9dpngmi", "template_izthnsq", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    }
  };

  const handleAddMockupLink = () => {
    if (!singleUser) {
      return;
    } else {
      const updateRef = firebase.db.collection("users").doc(singleUser.id);
      updateRef.update(
        {
          mockupLink: mockupLink,
        },
        { merge: true }
      );
    }
  };

  const handleCurrentStep = (step) => {
    if (step === 0) {
      return "Design Questionaire";
    } else if (step === 1) {
      return "Hosting Selection";
    } else if (step === 2) {
      return "Mockup Creation/Approval";
    }
  };

  return (
    <div className="user-single">
      {singleUser && (
        <>
          <h3>
            {" "}
            {singleUser.firstName} {singleUser.lastName}
          </h3>
          <p>Current Step: {handleCurrentStep(singleUser.currentStep)}</p>
          <br />
          Project Status: {singleUser.projectStatus}
          <br />
          <div style={{ margin: "auto", width: "50%" }}>
            <Grid container justify="center" spacing={6}>
              <Grid item xs={12}>
                <Card style={{ width: "100%", margin: "auto" }}>
                  <CardContent>
                    {singleUser.designQuestions ? (
                      <>
                        {" "}
                        <h4>Design Questions</h4>
                        Business Name: {
                          singleUser.designQuestions.businessName
                        }{" "}
                        <br />
                        Current Website:{" "}
                        {singleUser.designQuestions.currentWebsite} <br />
                        References: {singleUser.designQuestions.references}{" "}
                        <br />
                        Colors: {singleUser.designQuestions.colors} <br />
                        Fonts: {singleUser.designQuestions.fonts} <br />
                        <Button
                          variant="outlined"
                          onClick={handleApprove}
                          disabled={
                            singleUser.currentStep > 0 ||
                            singleUser.stepStatus === "approved"
                          }
                        >
                          {singleUser.stepStatus === "approved" ||
                          singleUser.currentStep > 0
                            ? "Approved"
                            : "Approve"}
                        </Button>{" "}
                      </>
                    ) : (
                      <> Waiting on Design Information </>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={6} style={{ margin: "auto" }}>
                <Card
                  style={{ width: "100%", margin: "auto", height: "300px" }}
                >
                  <CardContent>
                    <h4>Hosting Package</h4>
                    Client Selected Hosting Package: {singleUser.hosting}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} style={{ margin: "auto" }}>
                <Card
                  style={{ width: "100%", margin: "auto", height: "300px" }}
                >
                  <CardContent>
                    <h4>Mockup Link</h4>
                    <TextField
                      variant="outlined"
                      label="enter mockup link here..."
                      value={mockupLink}
                      onChange={(e) => setMockupLink(e.target.value)}
                      size="small"
                    />
                    <Button
                      onClick={handleAddMockupLink}
                      size="md"
                      variant="contained"
                      color="primary"
                    >
                      Add Link
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSingle;
