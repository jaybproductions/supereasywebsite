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
} from "../../utils/UpdateUserDetails";
import CheckoutContext from "../../contexts/CheckoutContext";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const DesignQuestions = ({ userData }) => {
  const { user } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);
  const handleChange = (e) => {
    setCheckoutInfo((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddPage = () => {
    const tempArr = checkoutInfo.pageArr;
    tempArr.push(" ");
    setCheckoutInfo((previousValues) => ({
      ...previousValues,
      pageArr: tempArr,
    }));
  };

  const handlePageChange = (e, index) => {
    let tempArr = checkoutInfo.pageArr;
    tempArr.splice(index, 1, e.target.value);
    setCheckoutInfo((previousValues) => ({
      ...previousValues,
      pageArr: tempArr,
    }));
    // tempArr = checkoutInfo.pageArr;
  };

  const submitDesign = async () => {
    const {
      businessName,
      currentWebsite,
      references,
      colors,
      fonts,
      comments,
    } = checkoutInfo;

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
      businessName: businessName,
      currentWebsite: currentWebsite,
      references: references,
      colors: colors,
      fonts: fonts,
      comments: comments,
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
    const imagesRef = ref.child(
      `logos/${checkoutInfo.businessName}}/${fileName}`
    );

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

  return (
    <div className="design-questions">
      <Card>
        <CardContent>
          <form
            style={{ padding: "10px", width: "50%", margin: "auto" }}
            id="design"
          >
            {/*<p style={{ textAlign: "left" }}>Upload a Logo</p>
            <TextField
              name="logo"
              variant="outlined"
              type="file"
              onChange={uploadLogo}
              fullWidth
            />*/}
            <br /> <br />
            <TextField
              name="references"
              variant="outlined"
              label="Design References"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            <TextField
              name="fonts"
              variant="outlined"
              label="Preferred Fonts"
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <div style={{ display: "inline", paddingTop: "15px" }} />
            <TextField
              name="colors"
              variant="outlined"
              label="Preferred Colors"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            Pages: <br />
            {checkoutInfo.pageArr.map((page, index) => (
              <>
                <TextField
                  value={page}
                  variant="outlined"
                  onChange={(e) => handlePageChange(e, index)}
                  fullWidth
                />
                <br />
                <br />
              </>
            ))}
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddPage}
            >
              Add Page
            </Button>
            <br />
            <br />
            <TextField
              variant="outlined"
              name="comments"
              label="Additional Comments"
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <br /> <br />
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default DesignQuestions;
