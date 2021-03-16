import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import LinkIcon from "@material-ui/icons/Link";
import Fab from "@material-ui/core/Fab";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const FinalDesign = () => {
  const { user } = useContext(UserContext);
  const [stagingLink, setStagingLink] = useState(null);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!user) return;
    getLink();
  }, [user]);

  const getLink = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    setStagingLink(docRef.data().stagingLink);
    if (docRef.data().stagingStatus === "approved") {
      setApproved(true);
    }
  };

  const handleSubmit = async (e) => {
    if (!user) return;
    e.preventDefault();
    const updateRef = firebase.db.collection("users").doc(user.uid);
    await updateRef.update(
      {
        stagingStatus: "approved",
      },
      { merge: true }
    );
    setApproved(true);
    const templateParams = {
      content: `Staging Site has been approved by ${user.displayName}`,
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
    toast.success("Thank you for approving the mockup.");
  };

  return (
    <div className="mockup-link">
      {stagingLink ? (
        <>
          Your Staging Site Link <br />
          <div style={{ paddingBottom: "5px" }} />
          <a href={stagingLink}>
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
        </>
      ) : (
        <>Please wait for staging site to be created... </>
      )}
      <ToastContainer />
    </div>
  );
};

export default FinalDesign;
