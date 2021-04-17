import React from "react";
import { Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 20,
    borderRadius: 0,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

function DashboardCard({ cardInfo }) {
  return (
    <Link to={cardInfo.url}>
      <div className="dashboard-card">
        <Card style={{ height: "150px", borderRadius: "30px" }}>
          <CardContent style={{ height: "125" }}>
            <div className="cardinfo-container">
              <div className="card-photo">
                <img src={cardInfo.picture} width="125px" height="100px" />
              </div>
              <div className="content-container">
                <div className="card-title">{cardInfo.title}</div>
                <div className="assigned-to">
                  Assigned To: {cardInfo.assignedTo}
                  <p
                    style={{
                      display: "flex",
                      color: "#10F2AC",
                      fontFamily: "Poppins",
                      fontStyle: "Bold",
                      fontSize: "28px",
                      paddingLeft: "300px",
                    }}
                  >
                    {cardInfo.progress}%
                  </p>
                </div>

                <div className="progress-bar">
                  <BorderLinearProgress
                    variant="determinate"
                    value={cardInfo.progress}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}

export default DashboardCard;
