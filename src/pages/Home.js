import React, { useContext, useState, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import firebase from "../firebase";
import AdminHome from "../components/Admin/AdminHome";

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
    <div className="home">
      {userData && (
        <>
          <h1> This is the home page</h1>
          {userData.isAdmin ? (
            <>
              <AdminHome user={user} userData={userData} />{" "}
            </>
          ) : (
            <>
              {" "}
              {user &&
                `Hello, ${user.displayName}. The current status of your project is ${userData.projectStatus}`}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
