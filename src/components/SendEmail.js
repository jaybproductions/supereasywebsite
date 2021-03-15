import React from "react";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_0HgOZL0g5w9HF8Uc69yMW");

const SendEmail = (templateParams) => {
  const service = "service_9dpngmi";
  const template = "template_ztr2vif";
  const params = this.templateParams;
  emailjs.send(service, template, templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      console.log(params);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
};

export default SendEmail;
