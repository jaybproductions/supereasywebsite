import React, { useContext, useEffect, useState } from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import validateDesignForm from "../../validators/validateDesignForm";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";

const DesignQuestions = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const INITIAL_VALUES = {
    businessName: "",
    currentWebsite: "",
    references: "",
    colors: "",
    fonts: "",
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
    const { businessName, currentWebsite, references, colors, fonts } = values;
    console.log(businessName);
    if (!user) {
      console.log("waiting to connect");
    } else {
      const updateRef = await firebase.db.collection("users").doc(user.uid);
      updateRef.update(
        {
          designQuestions: {
            businessName: businessName,
            currentWebsite: currentWebsite,
            references: references,
            colors: colors,
            fonts: fonts,
          },
          stepStatus: "pending",
        },
        { merge: true }
      );
      getUser();
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
              <h4>Please fill out this design questionare and submit...</h4>
              <Card>
                <CardContent>
                  <form style={{ padding: "10px" }}>
                    <TextField
                      name="businessName"
                      variant="outlined"
                      style={{ padding: "10px" }}
                      onChange={handleChange}
                    />
                    <TextField
                      name="currentWebsite"
                      variant="outlined"
                      style={{ padding: "10px" }}
                      onChange={handleChange}
                    />
                  </form>
                  <form style={{ padding: "10px" }}>
                    <TextField
                      name="references"
                      variant="outlined"
                      style={{ padding: "10px" }}
                      onChange={handleChange}
                    />
                    <TextField
                      name="colors"
                      variant="outlined"
                      style={{ padding: "10px" }}
                      onChange={handleChange}
                    />
                  </form>
                  <form style={{ padding: "10px" }}>
                    <TextField
                      name="fonts"
                      variant="outlined"
                      style={{ padding: "10px" }}
                      onChange={handleChange}
                    />
                    <TextField variant="outlined" style={{ padding: "10px" }} />
                  </form>
                  <Button onClick={handleSubmit}>Submit</Button>
                </CardContent>
              </Card>{" "}
            </>
          ) : (
            <>Thank you for submitting, please wait for approval. </>
          )}
        </>
      )}
    </div>
  );
};

export default DesignQuestions;
