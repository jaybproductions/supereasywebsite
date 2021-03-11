import React, { useContext, useEffect, useState } from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import useForm from "../../hooks/useForm";
import validateDesignForm from "../../validators/validateDesignForm";
import firebase from "../../firebase";
import UserContext from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";

const DesignQuestions = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const INITIAL_VALUES = {
    businessName: "",
    currentWebsite: "",
    references: "",
    colors: "",
    fonts: "",
    comments: "",
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
    const {
      businessName,
      currentWebsite,
      references,
      colors,
      fonts,
      comments,
    } = values;
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
            comments: comments,
          },
          stepStatus: "pending",
        },
        { merge: true }
      );
      toast.success(
        "Thank you for submitting design questions. Please wait for approval to move to next step..."
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
              <Card>
                <CardContent>
                  <form style={{ padding: "10px" }}>
                    <TextField
                      name="businessName"
                      variant="outlined"
                      label="Business Name"
                      onChange={handleChange}
                    />
                    <TextField
                      name="currentWebsite"
                      variant="outlined"
                      label="Current Website Address"
                      onChange={handleChange}
                    />
                  </form>
                  <form
                    style={{ padding: "10px", margin: "auto", width: "430px" }}
                  >
                    <TextField
                      name="references"
                      variant="outlined"
                      label="References"
                      onChange={handleChange}
                      fullWidth
                    />
                  </form>
                  <form style={{ padding: "10px" }}>
                    <TextField
                      name="fonts"
                      variant="outlined"
                      label="Fonts"
                      onChange={handleChange}
                    />
                    <TextField
                      name="colors"
                      variant="outlined"
                      label="Colors"
                      onChange={handleChange}
                    />
                  </form>
                  <form
                    style={{ padding: "10px", width: "430px", margin: "auto" }}
                  >
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
                  </form>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
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
