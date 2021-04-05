import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../../firebase";
import { Button, Card, CardContent, TextField, Grid } from "@material-ui/core";
import { update } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
import DesignQuestionsCard from "../AdminUserInfo/DesignQuestionsCard";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const UserSingle = () => {
  const { project } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  const [mockupLink, setMockupLink] = useState("");
  const [stagingLink, setStagingLink] = useState("");
  const [websiteInfo, setWebsiteInfo] = useState(null);
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    getUser();
  }, [project]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(project).get();
    const websiteRef = await firebase.db
      .collection("websites")
      .doc(project)
      .get();
    console.log(docRef.data());
    setSingleUser(docRef.data());
    setMockupLink(websiteRef.data().mockupLink);
    setWebsiteInfo(websiteRef.data());
    setStagingLink(websiteRef.data().stagingLink);
    if (docRef.data().designQuestionStatus === "approved") {
      setApproved(true);
    }
  };

  const handleApprove = () => {
    if (!singleUser) {
      console.log("waiting to connect");
    } else {
      const updateRef = firebase.db.collection("users").doc(singleUser.id);
      updateRef.update(
        {
          designQuestionStatus: "approved",
          stepStatus: "started",
          currentStep: singleUser.currentStep + 1,
          projectStatus: "Selecting Hosting Package",
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

  const handleAddMockupLink = async () => {
    if (!singleUser) {
      return;
    } else {
      const updateRef = firebase.db.collection("websites").doc(singleUser.id);
      await updateRef.update(
        {
          mockupLink: mockupLink,
          mockupStatus: "pending",
        },
        { merge: true }
      );
      const templateParams = {
        content:
          "Your Mockup Link has been added. Please go to the websites tab to review.",
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

  const handleAddStagingLink = async () => {
    if (!singleUser) {
      return;
    } else {
      const updateRef = firebase.db.collection("websites").doc(singleUser.id);
      await updateRef.update(
        {
          stagingLink: stagingLink,
          stagingStatus: "pending",
        },
        { merge: true }
      );
      const templateParams = {
        content:
          "Your Staging Site Link has been added. Please go to the websites tab to review.",
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

  const handleCurrentStep = (step) => {
    if (step === 0) {
      return "Design Questionaire";
    } else if (step === 1) {
      return "Hosting Selection";
    } else if (step === 2) {
      return "Mockup Creation/Approval";
    } else if (step === 3) {
      return "Final Design and Testing";
    } else if (step === 4) {
      return "Launch and Live!";
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
                {websiteInfo && (
                  <DesignQuestionsCard websiteInfo={websiteInfo} />
                )}
                <div style={{ paddingTop: "10px" }} />
                <Button
                  onClick={handleApprove}
                  variant="contained"
                  color="primary"
                  disabled={approved}
                >
                  {approved ? "Approved" : "Approve"}
                </Button>
              </Grid>

              <Grid item xs={6} style={{ margin: "auto" }}>
                <Card
                  style={{ width: "100%", margin: "auto", height: "300px" }}
                >
                  <CardContent>
                    <h4>Hosting Package</h4>
                    {websiteInfo && (
                      <>
                        {websiteInfo.hosting ? (
                          <>
                            Client Selected Hosting Package:{" "}
                            {websiteInfo.hosting}{" "}
                          </>
                        ) : (
                          <>
                            Please wait for client to choose hosting package.{" "}
                          </>
                        )}
                      </>
                    )}
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
                    <div style={{ paddingTop: "20px" }} />
                    <h4>Staging Site Link</h4>
                    <TextField
                      variant="outlined"
                      label="enter staging link here..."
                      value={stagingLink}
                      onChange={(e) => setStagingLink(e.target.value)}
                      size="small"
                    />
                    <Button
                      onClick={handleAddStagingLink}
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