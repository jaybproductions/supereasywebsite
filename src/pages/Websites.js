import React, { useEffect, useContext, useState } from "react";
import { Paper, Grid, Card, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import BrushIcon from "@material-ui/icons/Brush";
import DescriptionIcon from "@material-ui/icons/Description";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import WebsiteStepper from "../components/websites/WebsiteStepper";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
    width: "75%",
  },
  paper: {
    height: 300,
    width: 300,
    margin: "auto",

    textAlign: "center",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const Websites = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [pages, setPages] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (!user) return;
    getUser();
  }, [user]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    setUserData(docRef.data());
    setPages(docRef.data().pages);
  };

  const handleHosting = (hosting) => {
    switch (hosting) {
      case "basic":
        return (
          <>
            <h5>Basic</h5>
            <ul>
              <li>Budget Friendly</li>
              <li>No integrated emails</li>
              <li>Fully Managed by Client</li>
            </ul>
          </>
        );
      case "intermediate":
        return (
          <>
            <h5>Intermediate</h5>
            <ul>
              <li>Integrated Emails</li>
              <li>Automatic Plugin Updates and Uptime Monitoring</li>
              <li>Partially Managed by Client</li>
            </ul>
          </>
        );
      case "advanced":
        return (
          <>
            <h5>Advanced</h5>
            <ul>
              <li>All features of intermediate</li>
              <li>CDN and Caching for fastest speed available</li>
              <li>Fully Managed by Us</li>
            </ul>
          </>
        );
      default:
        return "You have no selected a package";
    }
  };

  return (
    <div className={classes.root}>
      <div className="stepper" style={{ paddingBottom: "100px" }}>
        <WebsiteStepper />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={3} lg={3}>
              {userData && (
                <>
                  {userData.designQuestions && (
                    <Card style={{ height: "100%" }}>
                      <CardContent>
                        <h4>Design Selections </h4>
                        <br />
                        {userData && (
                          <div style={{ fontSize: "14px" }}>
                            Business Name:{" "}
                            {userData.designQuestions.businessName}
                            <br />
                            Current Website:{" "}
                            {userData.designQuestions.currentWebsite}
                            <br />
                            References: {
                              userData.designQuestions.references
                            }{" "}
                            <br />
                            Fonts: {userData.designQuestions.fonts} <br />
                            Colors: {userData.designQuestions.colors} <br />
                            Comments: {userData.designQuestions.comments} <br />
                          </div>
                        )}
                        <Button variant="outlined">Request Changes</Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={3} lg={3}>
              {userData && (
                <>
                  {userData.hosting && (
                    <Card style={{ height: "100%" }}>
                      <CardContent>
                        <h4>Selected Hosting Package</h4>
                        <br />
                        {userData && handleHosting(userData.hosting)}
                        <Button variant="outlined">Request Changes</Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={3} lg={3}>
              <Card style={{ height: "100%" }}>
                <CardContent>
                  {" "}
                  <h4>Pages</h4>
                  {pages &&
                    pages.map((page, index) => (
                      <>
                        <Link
                          to={`/websites/content/${page}`}
                          style={{ color: "black" }}
                        >
                          <div className="page" style={{ padding: "10px" }}>
                            {page}
                          </div>
                        </Link>
                      </>
                    ))}
                  <Button variant="outlined">Request Additional</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Websites;
