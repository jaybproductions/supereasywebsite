import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { GetUserDataFromFirebase } from "../utils/GetUserDetails";
import { Switch, Route, Redirect } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../../css/Admin.css";
import Projects from "../../pages/Projects";
import AdminHome from "../Admin/AdminHome";
import UserSingle from "../Admin/Projects/UserSingle";

const AdminContainer = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    if (!user) return;
    handleGetUserDataFromFirebase();
  }, [user]);

  const handleGetUserDataFromFirebase = async () => {
    const userData = await GetUserDataFromFirebase(user.uid);
    setUserData(userData);
    if (!userData.isAdmin) return history.push("/home");
  };

  return (
    <div className="content">
      <Route
        render={({ location, history }) => (
          <React.Fragment>
            <SideNav
              onSelect={(selected) => {
                const to = "/" + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="admin/home">
                <NavItem eventKey="admin/home">
                  <NavIcon>
                    <ion-icon name="home-outline"></ion-icon>
                  </NavIcon>
                  <NavText>Dashboard</NavText>
                </NavItem>
                <NavItem eventKey="admin/projects">
                  <NavIcon>
                    <ion-icon name="person-circle-outline"></ion-icon>
                  </NavIcon>
                  <NavText>Projects</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
            <main>
              <Route
                path="/admin/home"
                exact
                component={(props) => <AdminHome />}
              />
              <Route
                path="/admin/projects"
                component={(props) => <Projects />}
              />
              <Route
                path="/admin/project/:project"
                component={(props) => <UserSingle />}
              />
            </main>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default AdminContainer;
