import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { useParams } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import UserContext from "../contexts/UserContext";

const PageSingle = () => {
  const { page } = useParams();
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    if (!user) return;
    getData();
  }, [user]);
  const getData = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    console.log(docRef.data());
    setUserData(docRef.data());
    const titleString = page + "Info";
    if (docRef.data()[titleString]) {
      setPageInfo(docRef.data()[titleString]);
    }
  };

  const updateInfo = async () => {
    console.log(pageInfo);
    if (!user) {
      console.log("waiting to connect");
    } else {
      const titleString = page + "Info";
      const updateRef = firebase.db.collection("users").doc(user.uid);
      console.log(titleString);
      updateRef.update(
        {
          [titleString]: pageInfo,
        },
        { merge: true }
      );
    }
  };
  return (
    <div>
      {page}
      <br />
      <TextField
        variant="outlined"
        value={pageInfo}
        onChange={(e) => setPageInfo(e.target.value)}
        multiline
        rows={10}
        rowsMax={15}
      />
      <br />
      <Button variant="contained" color="primary" onClick={updateInfo}>
        Update
      </Button>
    </div>
  );
};

export default PageSingle;
