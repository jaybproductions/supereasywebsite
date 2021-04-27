import React, { useState, useEffect, useContext } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import SidebarContainer from "../components/Dashboard/SidebarContainer";
import Mockupimg from "../images/mockupimg.jfif";
import Contentimg from "../images/contentupload.jfif";
import Finalimg from "../images/finalapproval.jfif";
import "../css/Dashboard.css";
import { GetUserDataFromFirebase } from "../components/utils/GetUserDetails";
import UserContext from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import MockupCreationDialog from "../components/Dashboard/dialogs/MockupCreationDialog";
import { Button } from "@material-ui/core";
import ContentUploadDialog from "../components/Dashboard/dialogs/ContentUploadDialog";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [openMockup, setOpenMockup] = useState(false);
  const [openContent, setOpenContent] = useState(false);
  let history = useHistory();
  useEffect(() => {
    if (!user) return;
    handleGetUserDataFromFirebase();
  }, [user]);

  const handleOpenMockup = () => {
    setOpenMockup(true);
  };

  const handleOpenContent = () => {
    setOpenContent(true);
  };

  const handleGetUserDataFromFirebase = async () => {
    const data = await GetUserDataFromFirebase(user.uid);
    if (data.isAdmin) return history.push("/admin/home");
    setUserInfo(data);
  };

  const card1Info = {
    title: "Mockup Creation",
    assignedTo: "SEW",
    picture: Mockupimg,
    progress: 50,
  };
  const card2Info = {
    title: "Content Upload",
    assignedTo: "SEW",
    picture: Contentimg,
    progress: 60,
    url: "/pages",
  };
  const card3Info = {
    title: "Final Approval and Launch ",
    assignedTo: "SEW",
    picture: Finalimg,
    progress: 30,
    url: "/questionnaire",
  };

  return (
    <div className="dashboard">
      <h2 style={{ color: "rgb(77, 94, 129)" }}>
        Welcome To Super Easy Website Dashboard
      </h2>
      {userInfo && (
        <div className="glass">
          <div className="sidebar">
            <SidebarContainer userInfo={userInfo} />
          </div>

          <div className="main-content">
            <h3
              style={{
                display: "grid",
                placeItems: "center",
                color: "#4D5E81",
              }}
            >
              Next Steps
            </h3>
            <div className="cards">
              <Button onClick={handleOpenMockup}>
                <DashboardCard cardInfo={card1Info} />
              </Button>
              <Button onClick={handleOpenContent}>
                <DashboardCard cardInfo={card2Info} />
              </Button>
              <DashboardCard cardInfo={card3Info} />
            </div>
            <MockupCreationDialog open={openMockup} setOpen={setOpenMockup} />
            <ContentUploadDialog open={openContent} setOpen={setOpenContent} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
