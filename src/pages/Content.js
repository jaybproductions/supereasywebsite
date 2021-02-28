import React, { useContext, useEffect, useState } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import { Card, CardContent, TextField } from "@material-ui/core";
import PageList from "../components/PageList";

const Content = () => {
  const { user } = useContext(UserContext);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    if (!user) return;
    getData();
  }, [user]);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const getData = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    console.log(docRef.data());
    setPages(docRef.data().pages);
  };
  return (
    <div className="design">
      <h1>Content page</h1>
      {pages && <PageList pages={pages} />}
    </div>
  );
};

export default Content;
