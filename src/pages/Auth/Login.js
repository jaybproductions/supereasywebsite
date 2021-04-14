import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../../css/Login.css";
import validateLogin from "../../validators/validateLogin";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import logo from "../../images/logo.png";
import { TextField, Button, Card, CardContent } from "@material-ui/core";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateLogin,
    authenticateUser
  );

  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { email, password } = values;

    try {
      await firebase.login(email, password);

      console.log("You are now logged in!");
      console.log(props);
      props.history.push("/home");
    } catch (err) {
      console.error("authentication error", err);
      console.log(err.message);
    }
    setBusy(false);
  }

  return (
    <div className="login">
      <Card style={{ width: "50%", margin: "auto", paddingTop: "100px" }}>
        <CardContent>
          <img src={logo} width="300px" style={{ paddingBottom: "20px" }} />
          <form lines="full">
            <TextField
              name="email"
              value={values.email}
              type="text"
              required
              onChange={handleChange}
              label="Email"
              variant="outlined"
            />
          </form>
          <form lines="full" style={{ paddingTop: "10px" }}>
            <TextField
              name="password"
              type="password"
              required
              value={values.password}
              onChange={handleChange}
              label="Password"
              variant="outlined"
            />
          </form>
          <div style={{ paddingTop: "10px" }}></div>
          <Button
            type="submit"
            color="primary"
            expand="block"
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant="contained"
          >
            Log In
          </Button>
          <br />
          <Link to={"/forgot"}>
            <p style={{ paddingTop: "10px" }}>Forgot Password?</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default withRouter(Login);
