import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import { Card, CardContent } from "@material-ui/core";

const Hosting = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;
    getUser();
  }, [user]);

  const getUser = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    const websiteRef = await firebase.db
      .collection("websites")
      .doc(user.uid)
      .get();
    setUserData(websiteRef.data());
  };
  const handleHosting = (hosting) => {
    switch (hosting) {
      case "basic":
        return (
          <Card style={{ width: "50%", margin: "auto" }}>
            <CardContent>
              <h5>Basic</h5>
              <div style={{ width: "50%", margin: "auto", textAlign: "left" }}>
                <ul>
                  <li>Budget Friendly</li>
                  <li>No integrated emails</li>
                  <li>Fully Managed by Client</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      case "intermediate":
        return (
          <Card style={{ width: "50%", margin: "auto" }}>
            <CardContent>
              <h5>Intermediate</h5>
              <div style={{ width: "50%", margin: "auto", textAlign: "left" }}>
                <ul>
                  <li>Integrated Emails</li>
                  <li>Automatic Plugin Updates and Uptime Monitoring</li>
                  <li>Partially Managed by Client</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      case "advanced":
        return (
          <Card style={{ width: "50%", margin: "auto" }}>
            <CardContent>
              <h5>Advanced</h5>{" "}
              <div style={{ width: "50%", margin: "auto", textAlign: "left" }}>
                <ul>
                  <li>All features of intermediate</li>
                  <li>CDN and Caching for fastest speed available</li>
                  <li>Fully Managed by Us</li>
                </ul>
              </div>
            </CardContent>{" "}
          </Card>
        );
      default:
        return "You have no selected a package";
    }
  };

  return (
    <div className="hosting" style={{ paddingTop: "30px" }}>
      <h4>Your Hosting Selection</h4>
      {userData && <>{handleHosting(userData.hosting)} </>}
      <div style={{ paddingBottom: "10px" }} />
      <div
        className="other-options"
        style={{ padding: "20px", backgroundColor: "#393034" }}
      >
        <h3 style={{ color: "white" }}>Options</h3>
        <Card style={{ width: "50%", margin: "auto" }}>
          <CardContent>
            <h5>Basic</h5>
            <div style={{ width: "50%", margin: "auto", textAlign: "left" }}>
              <ul>
                <li>Budget Friendly</li>
                <li>No integrated emails</li>
                <li>Fully Managed by Client</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <div style={{ paddingTop: "10px" }} />
        <Card style={{ width: "50%", margin: "auto" }}>
          <CardContent>
            <h5>Intermidiate</h5>
            <div style={{ width: "50%", margin: "auto", textAlign: "left" }}>
              <ul>
                <li>Integrated Emails</li>
                <li>Automatic Plugin Updates and Uptime Monitoring</li>
                <li>Partially Managed by Client</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <div style={{ paddingTop: "10px" }} />
        <Card style={{ width: "50%", margin: "auto" }}>
          <CardContent>
            <h5>Advanced</h5>
            <div style={{ width: "50%", margin: "auto", textAlign: "left" }}>
              <ul>
                <li>All features of intermediate</li>
                <li>CDN and Caching for fastest speed available</li>
                <li>Fully Managed by Us</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hosting;
