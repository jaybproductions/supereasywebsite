import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { Link } from "react-router-dom";
import DesignQuestionDialog from "./dialogs/DesignQuestionDialog";
import RequestAdditional from "./dialogs/RequestAdditional";
import ContactDialog from "./dialogs/ContactDialog";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import FaqDialog from "./dialogs/FaqDialog";

function SidebarLinks() {
  const [openDesign, setOpenDesign] = useState(false);
  const [openRequests, setOpenRequests] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);

  const handleClickOpenDesign = () => {
    setOpenDesign(true);
  };

  const handleClickOpenRequest = () => {
    setOpenRequests(true);
  };

  const handleClickOpenContact = () => {
    setOpenContact(true);
  };

  const handleClickOpenFaq = () => {
    setOpenFaq(true);
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
        <IconButton onClick={handleClickOpenFaq}>
          <LiveHelpIcon style={{ fontSize: "50px" }} />
          FAQ
        </IconButton>
      </div>

      <div className="sidebar-link">
        <IconButton onClick={handleClickOpenContact}>
          <PermContactCalendarIcon style={{ fontSize: "50px" }} />
          Contact
        </IconButton>
      </div>

      <DesignQuestionDialog open={openDesign} setOpen={setOpenDesign} />
      <RequestAdditional open={openRequests} setOpen={setOpenRequests} />
      <ContactDialog open={openContact} setOpen={setOpenContact} />
      <FaqDialog open={openFaq} setOpen={setOpenFaq} />
    </div>
  );
}

export default SidebarLinks;
