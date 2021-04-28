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

  document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  });

  const [busy, setBusy] = useState(false);

  async function authenticateUser() {
    setBusy(true);
    const { email, password } = values;

    try {
      await firebase.login(email, password);

      props.history.push("/dashboard");
    } catch (err) {
      console.error("authentication error", err);
    }
    setBusy(false);
  }

  return (
    <div className="login">
      <div className="logo">
        <img src={logo} width="300px" style={{ paddingBottom: "20px" }} />
      </div>
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
        <br />
        <br />
        <TextField
          name="password"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
          label="Password"
          variant="outlined"
        />
        <br />
        <br />
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
      </form>
    </div>
  );
};

export default withRouter(Login);
