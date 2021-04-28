import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import { Button, TextField } from "@material-ui/core";
import { GetUserWebsiteDataFromFirebase } from "../../utils/GetUserDetails";

const Questionnaire = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [updated, setUpdated] = useState({
    businessName: "",
  });

  useEffect(() => {
    if (!user) return;
    handleGetDataFromFirebase();
  }, [user]);

  const handleGetDataFromFirebase = async () => {
    const websiteData = await GetUserWebsiteDataFromFirebase(user.uid);
    setUserData(websiteData);
    setUpdated(websiteData.designQuestions);
    console.log(userData, websiteData);
  };

  async function SubmitChanges() {
    console.log(updated);
    const updateRef = firebase.db.collection("websites").doc(user.uid);
    const check = await updateRef.get();
    if (!check.exists) {
      console.log("doc does not exist");
      updateRef.set({
        id: user.uid,
        client: user.displayName,
        designQuestions: updated,
      });
    } else {
      updateRef.update(
        {
          id: user.uid,
          client: user.displayName,
          designQuestions: updated,
        },
        { merge: true }
      );
    }
  }

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

  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    setUpdated((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="questionnaire">
      {userData && (
        <>
          <TextField
            label="BusinessName"
            name="businessName"
            variant="outlined"
            value={updated.businessName}
            onChange={handleChange}
            fullWidth
          />
          <br /> <br />
          <TextField
            label="Current Website"
            name="currentWebsite"
            variant="outlined"
            value={updated.currentWebsite}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <div style={{ padding: "15px" }} />
          <p style={{ textAlign: "left" }}>Upload a logo</p>
          <TextField
            name="logo"
            placeholder=""
            type="file"
            variant="outlined"
            value={updated.logo}
            onChange={uploadLogo}
            fullWidth
          />
          <br />
          {userData.logo ? (
            <>
              <p>Your Current Logo</p>
              <img src={userData.logo} width="300" height="300" />
            </>
          ) : (
            <>No logo uploaded yet</>
          )}
          <div style={{ padding: "15px" }} />
          <TextField
            label="References"
            name="references"
            variant="outlined"
            value={updated.references}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <div style={{ padding: "15px" }} />
          <TextField
            label="Colors"
            name="colors"
            variant="outlined"
            value={updated.colors}
            onChange={handleChange}
            fullWidth
          />
          <br /> <br />
          <TextField
            label="Fonts"
            name="fonts"
            variant="outlined"
            value={updated.fonts}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <div style={{ padding: "15px" }} />
          <TextField
            label="Comments"
            name="comments"
            variant="outlined"
            value={updated.comments}
            onChange={handleChange}
            multiline
            rows={4}
            rowsMax={6}
            fullWidth
          />
          <div style={{ paddingBottom: "10px" }} />
          <Button
            variant="contained"
            color="primary"
            onClick={SubmitChanges}
            fullWidth
          >
            Save Changes
          </Button>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
