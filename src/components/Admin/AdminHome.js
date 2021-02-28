import React from "react";

const AdminHome = ({ user, userData }) => {
  return (
    <div className="admin-home">
      <h3>This is an admin page</h3>
      <p>
        Hello, {user.displayName}, we currently have "X" number of open
        projects. <br /> Please Visit the projects tab to see open projects
      </p>
    </div>
  );
};

export default AdminHome;
