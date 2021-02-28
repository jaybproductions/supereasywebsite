import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import validatePasswordReset from "../../validators/validatePasswordReset";
import firebase from "../../firebase";
import { TextField, Button } from "@material-ui/core";
import logo from "../../images/logo.png";

const INITIAL_STATE = {
  email: "",
};

const Forgot = (props) => {
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validatePasswordReset,
    handleResetPassword
  );

  const [busy, setBusy] = useState(false);

  async function handleResetPassword() {
    setBusy(true);
    const { email } = values;

    try {
      await firebase.resetPassword(email);
      console.log("Check your email to reset password");
    } catch (err) {
      console.log("Password reset error", err);
      console.log("Unable to reset password. Please try again.");
    }
    setBusy(false);
  }

  return (
    <div className="forgot">
      <img src={logo} width="300px" style={{ padding: "20px" }} />

      <form lines="full">
        <TextField
          name="email"
          type="text"
          required
          value={values.email}
          onChange={handleChange}
          label="Email Address"
          variant="outlined"
        />
      </form>
      <div style={{ padding: "10px" }}></div>
      <Button
        type="submit"
        color="primary"
        expand="block"
        onClick={handleSubmit}
        disabled={isSubmitting}
        variant="outlined"
      >
        Get Reset Link
      </Button>
    </div>
  );
};

export default Forgot;
