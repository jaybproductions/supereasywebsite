import React from "react";
import { Card, CardContent } from "@material-ui/core";
import PageItem from "./PageItem";
const PageList = ({ pages }) => {
  return (
    <div
      style={{
        backgroundColor: "lightslategrey",
        padding: "30px",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "white", paddingBottom: "10px" }}>
        Your Current Pages
      </h1>
      {pages.map((page, index) => (
        <>
          <PageItem page={page} />
        </>
      ))}
    </div>
  );
};

export default PageList;
