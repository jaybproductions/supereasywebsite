import React from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";

const handleChange = () => {};

const handleSubmit = () => {};

function BasicInfo() {
  return (
    <div className="basic-info">
      <Card>
        <CardContent>
          <form
            style={{ padding: "10px", width: "50%", margin: "auto" }}
            id="design"
          >
            <TextField
              name="firstName"
              variant="outlined"
              label="First Name"
              onChange={handleChange}
              fullWidth
            />
            <br /> <div style={{ paddingTop: "15px" }} />
            <TextField
              name="lastName"
              variant="outlined"
              label="Last Name"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            <TextField
              name="email"
              variant="outlined"
              label="Email "
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            <TextField
              name="phone"
              variant="outlined"
              label="Phone Number"
              onChange={handleChange}
              fullWidth
            />
            <br />
            <br />
            <div style={{ display: "inline", paddingTop: "15px" }} />
            <TextField
              name="password"
              variant="outlined"
              label="Password"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicInfo;
