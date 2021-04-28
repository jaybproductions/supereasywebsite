import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import PageList from "../components/./websites/Pages/PageList";
import { GetUserWebsiteDataFromFirebase } from "../utils/GetUserDetails";
import "../css/Pages.css";

const Content = () => {
  const { user } = useContext(UserContext);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    if (!user) return;
    handleGetWebsiteDataFromApi();
  }, [user]);

  const handleGetWebsiteDataFromApi = async () => {
    const websiteData = await GetUserWebsiteDataFromFirebase(user.uid);
    setPages(websiteData.pages);
  };
  return <div className="design">{pages && <PageList pages={pages} />}</div>;
};

export default Content;
