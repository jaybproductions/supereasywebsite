import React, { useContext, useState, useEffect } from "react";
import useForm from "../../hooks/useForm";
import firebase from "../../firebase";
import validateSignup from "../../validators/validateSignup";
import UserContext from "../../contexts/UserContext";
import { TextField, Button, Checkbox } from "@material-ui/core";

const INITIAL_STATE = {
  name: "",
  url: "",
  image: null,
  email: "",
  password: "",
  photoURL: "",
  firstName: "",
  lastName: "",
  projectStatus: "started",
};

const Signup = (props) => {
  const { user } = useContext(UserContext);
  const { handleSubmit, handleChange, values, isSubmitting } = useForm(
    INITIAL_STATE,
    validateSignup,
    authenticateUser
  );

  const [busy, setBusy] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [pages, setPages] = useState("");

  async function authenticateUser() {
    const pageArr = pages.split(",");
    setBusy(true);
    const {
      name,
      email,
      password,
      photoURL,
      isAdmin,
      firstName,
      lastName,
    } = values;
    console.log(admin, firstName, lastName);
    try {
      const newUser = await firebase.register(name, email, password, photoURL);
      firebase.db.collection("users").doc(newUser).set({
        id: newUser,
        isAdmin: admin,
        firstName: firstName,
        lastName: lastName,
        username: name,
        email: email,
        pages: pageArr,
      });
      console.log("You have signed up succsessfully!");
      props.history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
    setBusy(false);
  }

  return (
    <div className="signup">
      <h1 style={{ paddingTop: "10px" }}>Create a New User</h1>

      <form lines="full">
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          name="firstName"
          type="text"
          required
          value={values.firstName}
          onChange={handleChange}
        ></TextField>
      </form>
      <form lines="full">
        <TextField
          name="lastName"
          type="text"
          label="Last Name"
          variant="outlined"
          required
          value={values.lastName}
          onChange={handleChange}
        ></TextField>
      </form>
      <form lines="full">
        <TextField
          name="name"
          type="text"
          label="Username"
          variant="outlined"
          required
          value={values.name}
          onChange={handleChange}
        ></TextField>
      </form>
      <form lines="full">
        <TextField
          name="email"
          type="text"
          label="Login Email"
          variant="outlined"
          required
          value={values.email}
          onChange={handleChange}
        ></TextField>
      </form>

      <form lines="full">
        <TextField
          name="password"
          type="password"
          variant="outlined"
          label="Login Password"
          required
          value={values.password}
          onChange={handleChange}
        ></TextField>
      </form>
      <form lines="full">
        <label position="floating">Admin</label>
        <Checkbox
          name="isAdmin"
          color="primary"
          value={admin}
          onChange={(e) => setAdmin(e.target.checked)}
        />
      </form>
      <form lines="full">
        <TextField
          variant="outlined"
          label="List pages separated by ','"
          name="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </form>
      <Button
        type="submit"
        color="primary"
        expand="block"
        onClick={handleSubmit}
        disabled={isSubmitting}
        variant="contained"
      >
        Create User
      </Button>
    </div>
  );
};

export default Signup;
