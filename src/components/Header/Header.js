import React, { useContext, useState, useEffect } from "react";
import firebase from "../../firebase";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { GetUserDataFromFirebase } from "../../utils/GetUserDetails";
import "../../App.css";
import "../../css/Header.css";
import logo from "../../images/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#FAFAFA",
    margin: "auto",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#FAFAFA",
    width: "85%",
    textAlign: "right",
    padding: "10px",
    margin: "auto",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {},
  content: {},
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  userInfo: {
    display: "flex",
    alignItems: "left",
    width: "100%",
  },
}));

const Header = (props) => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    handleGetUserDataFromApi();
  }, [user]);

  async function LogoutUser() {
    try {
      await firebase.logout();
      props.history.push("/login");
      console.log("You are now logged out.");
    } catch (err) {
      console.error("Unable to log out", err);
      console.log(err.message);
    }
  }

  const handleGetUserDataFromApi = async () => {
    const userInfo = await GetUserDataFromFirebase(user.uid);
    setUserData(userInfo);
  };

  return (
    <>
      <div className="header">
        <CssBaseline />
        <AppBar
          position="static"
          elevation={0}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Typography variant="h6" noWrap style={{ width: "15%" }}>
              <div className="title">
                <h3>{props.title}</h3>
                <Link to="/">
                  <img
                    src={logo}
                    width="100px"
                    style={{ padding: "10px" }}
                    alt="logo"
                  />
                </Link>
              </div>
            </Typography>

            <div className="links">
              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Features
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("pricing")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Pricing
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("faq")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                FAQ's
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("testimonials")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Testimonials
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("questions")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Help
              </button>
            </div>
            <Typography style={{ textAlign: "right" }}>
              {" "}
              <div className={classes.userInfo}>
                {user ? (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      to="/dashboard"
                      component={Link}
                    >
                      Go To Dashboard
                    </Button>
                    <Button
                      style={{ color: "black", cursor: "pointer" }}
                      onClick={LogoutUser}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      to="/checkout/select"
                      component={Link}
                      color="secondary"
                    >
                      Sign Up
                    </Button>
                    <Button to="/login" component={Link}>
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.component}
      </main>
    </>
  );
};

export default withRouter(Header);
