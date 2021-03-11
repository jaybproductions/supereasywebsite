import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import firebase from "../../firebase";

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
          <a href={mockupLink}>Click here to see Mockup</a>
        </>
      ) : (
        <>Please wait for mockup to be created... </>
      )}
    </div>
  );
};

export default MockupLink;
