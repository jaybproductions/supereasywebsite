import React, { useContext } from "react";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import CheckoutContext from "../../contexts/CheckoutContext";

function BasicInfo() {
  const { checkoutInfo, setCheckoutInfo } = useContext(CheckoutContext);

  const handleChange = (e) => {
    setCheckoutInfo((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

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
              type="password"
              label="Password"
              onChange={handleChange}
              fullWidth
            />
            <br /> <br />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BasicInfo;
