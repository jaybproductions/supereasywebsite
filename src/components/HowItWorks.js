import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BrushIcon from "@material-ui/icons/Brush";
import PublicIcon from "@material-ui/icons/Public";
import WebIcon from "@material-ui/icons/Web";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function HowItWorks() {
  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "30px",
        backgroundColor: "#393043",
      }}
    >
      {" "}
      <div style={{ width: "50%", margin: "auto" }}>
        <h4 style={{ color: "white" }}>How it works</h4>
        <Timeline align="alternate">
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                <p style={{ color: "white" }}>Step 1</p>
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <BrushIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Design Questionairre
                </Typography>
                <Typography>
                  Fill out the design questionaire so we can get a feel for how
                  you want your website to look and to make the mockup process
                  quicker for you.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                <p style={{ color: "white" }}>Step 2</p>
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <PublicIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Choose a Hosting Package
                </Typography>
                <Typography>
                  Choose the package that fits your budget. Don't worry, you can
                  upgrade at any time.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                <p style={{ color: "white" }}>Step 3</p>
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <WebIcon />
              </TimelineDot>
              <TimelineConnector className={classes.secondaryTail} />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Mockup Creation/Approval
                </Typography>
                <Typography>
                  We will create a mockup for you based on the design
                  questionare in Step 1 .{" "}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                <p style={{ color: "white" }}>Step 4</p>
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <LaptopMacIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  Launch and Live!
                </Typography>
                <Typography>
                  Once you approve the mockup, we will prepare the website for
                  launch. You will have another chance to make final approval of
                  the site before it is live.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
}
