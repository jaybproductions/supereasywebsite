import React from "react";

import { Card, CardContent } from "@material-ui/core";
import PageItem from "./PageItem";
const PageList = ({ pages }) => {
  return (
    <>
      {pages.map((page, index) => (
        <>
          <PageItem page={page} />
        </>
      ))}
    </>
  );
};

export default PageList;
