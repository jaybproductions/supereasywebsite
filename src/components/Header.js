import React, { useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  HomeOutlined,
  Public,
  ContactMail,
  Highlight,
  AccountTree,
} from "@material-ui/icons";
import "../App.css";
import logo from "../images/logo.png";

import AccountIcon from "./AccountIcon";

const drawerWidth = 240;

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    backgroundColor: "#393034",
    color: "#ffffff",
    margin: "auto",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#393034",
    textAlign: "right",
    padding: "10px",
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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  userInfo: {
    textAlign: "left",
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
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          {userData && (
            <div
              className="admin-bar"
              style={{
                height: "5px",
                backgroundColor: "blue",
                zIndex: "999999",
                paddingLeft: "0px",
                paddingBottom: "40px",
                padding: "15px",
                margin: "auto",
                width: "100%",
                color: "white",
                textAlign: "center",
              }}
            >
              <h6 style={{ width: "50%", margin: "auto" }}>
                {userData.isAdmin ? "You're an admin" : "Customer"}
              </h6>
            </div>
          )}
          <Toolbar>
            <Typography variant="h6" noWrap style={{ width: "60%" }}>
              <div className="title">
                <h3>{props.title}</h3>
                <Link to="/">
                  <img src={logo} width="100px" style={{ padding: "10px" }} />
                </Link>
              </div>
            </Typography>

            <div
              className="icons"
              style={{
                width: "100%",
                margin: "auto",
                textAlign: "center",
                justifyContent: "space-between",
              }}
            >
              {" "}
              {userData && (
                <>
                  {userData.isAdmin ? (
                    <>
                      {" "}
                      <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        showLabels
                        className={classes.root}
                      >
                        <BottomNavigationAction
                          component={Link}
                          to="/home"
                          label="Home"
                          icon={<HomeOutlined />}
                          className={classes.root}
                          style={{ textDecoration: "none" }}
                        />
                        <BottomNavigationAction
                          component={Link}
                          to="/projects"
                          label="Projects"
                          icon={<AccountTree />}
                          className={classes.root}
                          style={{ textDecoration: "none" }}
                        />{" "}
                        <BottomNavigationAction
                          component={Link}
                          to="/marketing"
                          label="Marketing"
                          icon={<Highlight />}
                          className={classes.root}
                          style={{ textDecoration: "none" }}
                        />
                      </BottomNavigation>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        showLabels
                        className={classes.root}
                      >
                        <BottomNavigationAction
                          component={Link}
                          to="/home"
                          label="Home"
                          icon={<HomeOutlined />}
                          className={classes.root}
                          style={{ textDecoration: "none" }}
                        />
                        <BottomNavigationAction
                          component={Link}
                          to="/websites"
                          label="Websites"
                          icon={<Public />}
                          className={classes.root}
                          style={{ textDecoration: "none" }}
                        />{" "}
                        <BottomNavigationAction
                          component={Link}
                          to="/marketing"
                          label="Marketing"
                          icon={<Highlight />}
                          className={classes.root}
                          style={{ textDecoration: "none" }}
                        />
                      </BottomNavigation>
                    </>
                  )}
                </>
              )}
            </div>

            <Typography style={{ textAlign: "right" }}>
              {" "}
              <div className={classes.userInfo}>
                {user ? (
                  <>
                    <AccountIcon user={user} LogoutUser={LogoutUser} />{" "}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Typography>
          </Toolbar>
        </AppBar>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
          style={{ paddingTop: "15px" }}
        >
          <div className={classes.drawerHeader} />
          {props.component}
        </main>
      </div>
    </>
  );
};

export default withRouter(Header);
