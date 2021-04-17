import React from "react";

function UserInfo({ userInfo }) {
  return (
    <div className="user-info">
      <div className="default-user-pic"></div>
      <div className="name">
        <h4>Hello, {userInfo.firstName}</h4>
      </div>
    </div>
  );
}

export default UserInfo;
