import React from "react";
import SidebarLinks from "./SidebarLinks";
import UserInfo from "./UserInfo";

function SidebarContainer({ userInfo }) {
  return (
    <div className="sidebar-container">
      <UserInfo userInfo={userInfo} />
      <SidebarLinks />
    </div>
  );
}

export default SidebarContainer;
