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
import CircularProgress from "@material-ui/core/CircularProgress";
import PublicIcon from "@material-ui/icons/Public";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto",
    width: "100%",
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
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUser();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [user]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    const websiteRef = await firebase.db
      .collection("websites")
      .doc(user.uid)
      .get();
    setUserData(websiteRef.data());
  };

  return (
    <div className={classes.root}>
      {loading ? (
        <div style={{ padding: "30px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div
            className="stepper"
            style={{
              paddingBottom: "100px",
              paddingTop: "20px",
              width: "75%",
              margin: "auto",
            }}
          >
            <WebsiteStepper />
          </div>
          <div
            style={{
              padding: "30px",
              backgroundColor: "#393034",
              height: "300px",
            }}
          >
            <h3 style={{ color: "white" }}>Your Info</h3>
            <div style={{ width: "85%", height: "50%", margin: "auto" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={3} lg={3}>
                      {userData && (
                        <>
                          {userData.designQuestions && (
                            <Card
                              style={{
                                height: "100%",
                                backgroundColor: "blue",
                              }}
                            >
                              <CardContent style={{ height: "50%" }}>
                                {userData && (
                                  <div style={{ fontSize: "18px" }}>
                                    <div style={{ paddingTop: "30px" }} />
                                    <Link
                                      to="/questionnaire"
                                      style={{ color: "black" }}
                                    >
                                      <BrushIcon
                                        style={{
                                          fontSize: "50px",
                                          color: "white",
                                        }}
                                      />
                                      <br />
                                      <b style={{ color: "white" }}>
                                        Design Questions
                                      </b>
                                    </Link>
                                  </div>
                                )}
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
                            <Card
                              style={{
                                height: "100%",
                                backgroundColor: "blue",
                              }}
                            >
                              <CardContent>
                                <div
                                  style={{
                                    fontSize: "18px",
                                    height: "50%",
                                    margin: "auto",
                                  }}
                                >
                                  <div style={{ paddingTop: "30px" }} />
                                  <Link
                                    to="/hosting"
                                    style={{ color: "black" }}
                                  >
                                    <b>
                                      <PublicIcon
                                        style={{
                                          fontSize: "50px",
                                          color: "white",
                                        }}
                                      />
                                      <br />{" "}
                                      <b style={{ color: "white" }}>
                                        Hosting Package
                                      </b>
                                    </b>
                                  </Link>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={3} lg={3}>
                      <Card style={{ height: "100%", backgroundColor: "blue" }}>
                        <CardContent>
                          <div
                            style={{
                              fontSize: "18px",
                              height: "50%",
                              margin: "auto",
                            }}
                          >
                            <div style={{ paddingTop: "30px" }} />
                            <Link to="/pages" style={{ color: "black" }}>
                              <b>
                                <DescriptionIcon
                                  style={{
                                    fontSize: "50px",
                                    color: "white",
                                  }}
                                />
                                <br />{" "}
                                <b style={{ color: "white" }}>Website Pages</b>
                              </b>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Websites;
