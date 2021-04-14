import React from "react";
import { ReactComponent as UserIcon } from "../../images/UserIcon.svg";
import { ReactComponent as LocationIcon } from "../../images/LocationIcon.svg";
import { ReactComponent as ServerIcon } from "../../images/ServerIcon.svg";

function IconsSection() {
  return (
    <div className="icons">
      <div id="1">
        <UserIcon />
        <b>90+ </b>Users
      </div>
      <div id="2">
        <LocationIcon />
        <b>30+</b> Locations
      </div>
      <div id="3">
        <ServerIcon />
        <b>50+</b> Servers
      </div>
    </div>
  );
}

export default IconsSection;
