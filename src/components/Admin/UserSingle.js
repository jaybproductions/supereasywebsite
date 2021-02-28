import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../firebase";
import { Button, Card, CardContent } from "@material-ui/core";

const UserSingle = () => {
  const { project } = useParams();
  const [singleUser, setSingleUser] = useState(null);
  useEffect(() => {
    getUser();
  }, [project]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(project).get();
    console.log(docRef.data());
    setSingleUser(docRef.data());
  };

  const handleApprove = () => {
    if (!singleUser) {
      console.log("waiting to connect");
    } else {
      const updateRef = firebase.db.collection("users").doc(singleUser.id);
      updateRef.update(
        {
          stepStatus: "approved",
        },
        { merge: true }
      );
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

          <Card>
            <CardContent>
              <br />
              Project Status: {singleUser.projectStatus}
              <br />
              <Card style={{ width: "50%", margin: "auto" }}>
                <CardContent>
                  <h4>Design Questions</h4>
                  Business Name: {singleUser.designQuestions.businessName}{" "}
                  <br />
                  Current Website: {
                    singleUser.designQuestions.currentWebsite
                  }{" "}
                  <br />
                  References: {singleUser.designQuestions.references} <br />
                  Colors: {singleUser.designQuestions.colors} <br />
                  Fonts: {singleUser.designQuestions.fonts} <br />
                  <Button
                    variant="outlined"
                    onClick={handleApprove}
                    disabled={singleUser.stepStatus === "approved"}
                  >
                    {singleUser.stepStatus === "approved"
                      ? "Approved"
                      : "Approve"}
                  </Button>
                </CardContent>
              </Card>
              Can show any additional information here such as clients Monday
              board and any additional information needed
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default UserSingle;
