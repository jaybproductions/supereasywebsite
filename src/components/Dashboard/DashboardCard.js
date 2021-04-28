import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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
    <div className="dashboard-card">
      <Card style={{ borderRadius: "30px" }}>
        <CardContent>
          <div className="cardinfo-container">
            <div className="card-photo">
              <img
                src={cardInfo.picture}
                width="80%"
                height="80%"
                alt="dashboard-card"
              />
            </div>
            <div className="content-container">
              <div className="card-title">{cardInfo.title}</div>

              <p
                style={{
                  display: "flex",
                  color: "#10F2AC",
                  fontFamily: "Poppins",
                  fontStyle: "Bold",
                  fontSize: "28px",
                }}
              >
                {cardInfo.progress}%
              </p>

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
  );
}

export default DashboardCard;
