import React from "react";
import PageItem from "./PageItem";
const PageList = ({ pages }) => {
  return (
    <div>
      {pages.map((page, index) => (
        <div key={index}>
          <PageItem page={page} />
        </div>
      ))}
    </div>
  );
};

export default PageList;
