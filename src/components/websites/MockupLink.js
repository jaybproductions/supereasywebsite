import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import LinkIcon from "@material-ui/icons/Link";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { SendEmail } from "../../utils/SendEmail";

const MockupLink = () => {
  const { user } = useContext(UserContext);
  const [mockupLink, setMockupLink] = useState(null);
  const [approved, setApproved] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;
    getLink();
  }, [user]);

  const getLink = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    const websiteRef = await firebase.db
      .collection("websites")
      .doc(user.uid)
      .get();
    setMockupLink(websiteRef.data().mockupLink);
    setUserData(docRef.data());
    if (websiteRef.data().mockupStatus === "approved") {
      setApproved(true);
    }
  };

  const handleSubmit = async (e) => {
    if (!user) return;
    e.preventDefault();
    const updateRef = firebase.db.collection("users").doc(user.uid);
    await updateRef.update(
      {
        currentStep: userData.currentStep + 1,
        projectStatus: "Mockup Approved, Waiting on Staging Site to be Created",
      },
      { merge: true }
    );
    await firebase.db.collection("websites").doc(user.uid).update(
      {
        mockupStatus: "approved",
      },
      { merge: true }
    );
    setApproved(true);
    const content = `Mockup has been approved by ${user.displayName}`;
    const emailResponse = await SendEmail(content);
    console.log(emailResponse);
    toast.success("Thank you for approving the mockup.");
  };

  return (
    <div className="mockup-link">
      {mockupLink ? (
        <>
          Your Mockup Link <br />
          <div style={{ paddingBottom: "5px" }} />
          <a href={mockupLink} target="_blank" rel="noreferrer">
            <Fab>
              <LinkIcon />
            </Fab>
            <br />
          </a>
          <div style={{ paddingTop: "10px" }} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={approved}
          >
            {approved ? "Approved" : "Approve"}
          </Button>
          <br />
          <br />
          {approved
            ? "You have approved your mockup. We will begin working on developing the website in a staging environment."
            : "Please review the mockup and approvde it once you are satified."}
        </>
      ) : (
        <>
          Mockup is Currently Being Created Based on Your Design Selections. We
          will reach out if we have any questions. <br />
          <br />
          You will recieve an email when your mockup link is available to
          review. It will also show here.
          <br />
          <br />
          In the meantime, please click on the "Content Upload" card to upload
          text/photo content for each of your pages.
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default MockupLink;
