import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import { Button, TextField, Card, CardContent } from "@material-ui/core";

const Questionnaire = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [updated, setUpdated] = useState({
    businessName: "",
  });

  useEffect(() => {
    if (!user) return;
    getData();
  }, [user]);

  const getData = async () => {
    const websiteRef = await firebase.db
      .collection("websites")
      .doc(user.uid)
      .get();
    setUserData(websiteRef.data());
    setUpdated(websiteRef.data().designQuestions);
  };

  async function SubmitChanges() {
    console.log(updated);
    const updateRef = firebase.db.collection("websites").doc(user.uid);
    const check = updateRef.get();
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

  const handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    setUpdated((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      className="questionnaire"
      style={{ padding: "30px", backgroundColor: "#393034" }}
    >
      <h1 style={{ color: "white" }}>Your selections.</h1>
      {userData && (
        <Card style={{ padding: "30px", width: "50%", margin: "auto" }}>
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
            Update
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Questionnaire;
