import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";
import AdminHome from "../components/Admin/AdminHome";
import "./Home.css";
import { Button } from "@material-ui/core";
import GettingStarted from "../components/GettingStarted";

const Home = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUser();
  }, [user]);

  const getUser = async () => {
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = await firebase.db.collection("users").doc(user.uid).get();
      const userData = docRef.data();
      setUserData(userData);
    }
  };
  return (
    <>
      <div className="home">
        {userData && (
          <>
            {userData.isAdmin ? (
              <>
                <AdminHome user={user} userData={userData} />{" "}
              </>
            ) : (
              <>
                {" "}
                {user && (
                  <>
                    <div className="hero-image">
                      <div className="hero-text">
                        <h1>Welcome to the Super Easy Website Dashboard</h1>
                        <p>
                          Hello, {user.displayName}. The current status of your
                          project is {userData.projectStatus}
                        </p>
                        <Button variant="contained" color="primary">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <GettingStarted />
    </>
  );
};

export default Home;
