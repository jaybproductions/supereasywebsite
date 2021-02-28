import React from "react";
import { TextField, Button, Checkbox } from "@material-ui/core";

const Design = () => {
  return (
    <div className="design">
      <h1>Design page</h1>
      <form lines="full">
        <TextField variant="outlined" label="Font(s)" />
      </form>
      <form lines="full">
        <TextField variant="outlined" label="Colors(s)" />
      </form>
      <form lines="full">
        <TextField variant="outlined" label="Comments" />
      </form>
    </div>
  );
};

export default Design;
