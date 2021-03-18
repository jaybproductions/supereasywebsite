import React, { useState, useEffect } from "react";
import { init } from "emailjs-com";
import { TextField, Button, CardContent, Card } from "@material-ui/core";
import emailjs from "emailjs-com";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const Questions = () => {
  const [comments, setComments] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    const templateParams = {
      content: `Name: ${name}, Email: ${email}, Comments: ${comments}`,
      to: "chris@btwebgroup.com",
    };
    emailjs.send("service_9dpngmi", "template_izthnsq", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  };
  return (
    <div
      className="questions"
      style={{
        padding: "30px",
        backgroundColor: "#393043",
        height: "100%",
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
                color="primary"
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
