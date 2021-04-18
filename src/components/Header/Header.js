import React, { useContext, useState, useEffect } from "react";
import firebase from "../../firebase";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import "../../App.css";
import "../../css/Header.css";
import logo from "../../images/logo.png";

const drawerWidth = 240;

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#ffff",
    color: "#ffffff",
    margin: "auto",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#ffff",
    width: "50%",
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
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    getUser();
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

  const getUser = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = await firebase.db.collection("users").doc(user.uid).get();
      const userData = docRef.data();
      setUserData(userData);
      console.log(userData);
    }
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
                  <img src={logo} width="100px" style={{ padding: "10px" }} />
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
                    </Button>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Button to="/login" component={Link}>
                      Sign In
                    </Button>
                    <Button variant="outlined" color="secondary">
                      Buy Now
                    </Button>
                  </>
                )}
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {props.component}
        </main>
      </div>
    </>
  );
};

export default withRouter(Header);
