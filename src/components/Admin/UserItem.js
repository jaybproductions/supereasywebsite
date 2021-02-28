import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  return (
    <div
      className="user-item"
      style={{ padding: "10px", width: "40%", margin: "auto" }}
    >
      <Link to={`/project/${user.id}`} style={{ textDecoration: "none" }}>
        <Card>
          <CardContent>
            {user.firstName} {user.lastName} - Status: {user.projectStatus}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default UserItem;
