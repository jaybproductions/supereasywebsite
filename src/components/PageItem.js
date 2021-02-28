import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const PageItem = ({ page }) => {
  return (
    <>
      <Link to={`/websites/content/${page}`}>
        <Card style={{ width: "50%", margin: "auto" }}>
          <CardContent>{page}</CardContent>
        </Card>
      </Link>
      <br />
    </>
  );
};

export default PageItem;
