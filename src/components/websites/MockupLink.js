import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";
import LinkIcon from "@material-ui/icons/Link";
import Fab from "@material-ui/core/Fab";

const MockupLink = () => {
  const { user } = useContext(UserContext);
  const [mockupLink, setMockupLink] = useState(null);

  useEffect(() => {
    if (!user) return;
    getLink();
  }, [user]);

  const getLink = async () => {
    const docRef = await firebase.db.collection("users").doc(user.uid).get();
    setMockupLink(docRef.data().mockupLink);
  };

  return (
    <div className="mockup-link">
      {mockupLink ? (
        <>
          Your Mockup Link <br />
          <div style={{ paddingBottom: "5px" }} />
          <a href={mockupLink}>
            <Fab>
              <LinkIcon />
            </Fab>
            <br />
          </a>
        </>
      ) : (
        <>Please wait for mockup to be created... </>
      )}
    </div>
  );
};

export default MockupLink;
