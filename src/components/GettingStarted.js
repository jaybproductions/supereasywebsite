import React from "react";
import "../pages/Home.css";
import { Card, CardContent, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const GettingStarted = () => {
  return (
    <div className="getting-started" style={{ paddingTop: "30px" }}>
      <h3>Getting Started</h3>
      <Card style={{ width: "50%", margin: "auto" }}>
        <CardContent>
          Please Visit the "Websites" Tab to get started.
          <br />
          <Link to="/websites" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="primary">
              Start
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default GettingStarted;
