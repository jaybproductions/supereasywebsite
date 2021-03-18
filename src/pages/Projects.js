import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import UserContext from "../contexts/UserContext";
import UserList from "../components/Admin/Projects/UserList";

const Projects = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, [user]);

  const getUserInfo = async () => {
    let tempArr = [];
    if (!user) {
      console.log("waiting to connect");
    } else {
      const docRef = await firebase.db
        .collection("users")
        .where("isAdmin", "==", false)
        .get();
      const tempUserData = docRef.docs;
      console.log(docRef);
      tempUserData.forEach((doc) => {
        console.log(doc.data());
        tempArr.push(doc.data());
      });
      setUserData(tempArr);
    }
  };
  return (
    <div className="projects">
      <h3>Current Projects</h3>
      {userData && <UserList users={userData} />}
    </div>
  );
};

export default Projects;
