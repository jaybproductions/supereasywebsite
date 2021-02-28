import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import BrushIcon from "@material-ui/icons/Brush";
import DescriptionIcon from "@material-ui/icons/Description";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import WebsiteStepper from "../components/websites/WebsiteStepper";

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>This is the websites page</h2>
      <div className="stepper" style={{ paddingBottom: "20px" }}>
        <WebsiteStepper />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={3} lg={3}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Websites;
