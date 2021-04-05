import React from "react";

const AdminHome = ({ user, userData }) => {
  return (
    <div className="hero-text">
      <h3 style={{ color: "white" }}>This is an admin page</h3>
      <p style={{ color: "white" }}>
        Hello, {user.displayName}, we currently have "X" number of open
        projects. <br /> Please Visit the projects tab to see open projects
      </p>
    </div>
  );
};

export default AdminHome;
