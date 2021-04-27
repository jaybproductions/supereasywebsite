import React from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";

function BusinessInfo() {
  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <div className="business-info">
      <Card>
        <CardContent>
          <form
            style={{ padding: "10px", width: "50%", margin: "auto" }}
            id="design"
          >
            <TextField
              name="businessName"
              variant="outlined"
              label="Business Name"
              onChange={handleChange}
              fullWidth
            />
            <br /> <div style={{ paddingTop: "15px" }} />
            <TextField
              name="address"
              variant="outlined"
              label="Business Address"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            <TextField
              name="domain"
              variant="outlined"
              label="Current Website Name"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
            <div style={{ display: "inline", paddingTop: "15px" }} />
            <TextField
              name="businessInfo"
              variant="outlined"
              label="Tell Us Some More About Your Business"
              onChange={handleChange}
              multiline
              rows={4}
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

export default BusinessInfo;
