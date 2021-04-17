import React from "react";
import { IconButton } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { Link } from "react-router-dom";
function SidebarLinks() {
  return (
    <div className="sidebar-links">
      <div className="sidebar-link">
        <IconButton to="/questionnaire" component={Link}>
          <MenuBookIcon style={{ fontSize: "50px" }} />
          Design Selections
        </IconButton>
      </div>
      <div className="sidebar-link">
        <IconButton to="/requests" component={Link}>
          <AddIcon style={{ fontSize: "50px" }} />
          Request Additional
        </IconButton>
      </div>
      <div className="sidebar-link">
        <IconButton to="/pages" component={Link}>
          <PostAddIcon style={{ fontSize: "50px" }} />
          Page Content
        </IconButton>
      </div>
      <div className="sidebar-link">
        <IconButton to="/contact" component={Link}>
          <PermContactCalendarIcon style={{ fontSize: "50px" }} />
          Contact
        </IconButton>
      </div>
    </div>
  );
}

export default SidebarLinks;
