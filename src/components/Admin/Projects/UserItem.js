import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  const handleCurrentStep = (step) => {
    if (step === 0) {
      return "Design Questionaire";
    } else if (step === 1) {
      return "Hosting Selection";
    } else if (step === 2) {
      return "Mockup Creation/Approval";
    }
  };
  return (
    <div
      className="user-item"
      style={{ padding: "10px", width: "40%", margin: "auto" }}
    >
      <Link to={`/project/${user.id}`} style={{ textDecoration: "none" }}>
        <Card>
          <CardContent>
            <h5>
              {user.firstName} {user.lastName}
            </h5>{" "}
            Status: {user.projectStatus}
            <br />
            Current Step: {handleCurrentStep(user.currentStep)}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default UserItem;
