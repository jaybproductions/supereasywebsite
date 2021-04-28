import React, { useState, useEffect } from "react";
import { TextField, Button, CardContent, Card } from "@material-ui/core";
import { SendEmail } from "../../utils/SendEmail";

const Questions = () => {
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    const content = `Name: ${name}, Email: ${email}, Comments: ${comments}`;
    const emailResponse = await SendEmail(content);
    console.log(emailResponse);
  };

  return (
    <div
      className="questions"
      style={{
        padding: "30px",
        height: "100%",
        paddingBottom: "100px",
      }}
    >
      <Card style={{ width: "50%", margin: "auto" }}>
        <CardContent>
          <h5>Questions?</h5>
          <p>
            Please fill out the form below and we will get back to you ASAP.
          </p>
          <div style={{ width: "70%", margin: "auto" }}>
            <form id="questions">
              <TextField
                name="name"
                value={name}
                label="Name"
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <TextField
                name="email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <TextField
                name="comments"
                value={comments}
                label="comments"
                onChange={(e) => setComments(e.target.value)}
                variant="outlined"
                fullWidth
              />
              <br />
              <br />
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Questions;
