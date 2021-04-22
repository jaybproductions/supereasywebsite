import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { Link } from "react-router-dom";
import DesignQuestionDialog from "./dialogs/DesignQuestionDialog";
import RequestAdditional from "./dialogs/RequestAdditional";

function SidebarLinks() {
  const [openDesign, setOpenDesign] = useState(false);
  const [openRequests, setOpenRequests] = useState(false);

  const handleClickOpenDesign = () => {
    setOpenDesign(true);
  };

  const handleClickOpenRequest = () => {
    setOpenRequests(true);
  };
  return (
    <div className="sidebar-links">
      <div className="sidebar-link">
        <IconButton onClick={handleClickOpenDesign}>
          <MenuBookIcon style={{ fontSize: "50px" }} />
          Design Selections
        </IconButton>
      </div>
      <div className="sidebar-link">
        <IconButton onClick={handleClickOpenRequest}>
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

      <DesignQuestionDialog open={openDesign} setOpen={setOpenDesign} />
      <RequestAdditional open={openRequests} setOpen={setOpenRequests} />
    </div>
  );
}

export default SidebarLinks;
