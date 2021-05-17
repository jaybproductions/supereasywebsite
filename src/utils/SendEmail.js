import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_0HgOZL0g5w9HF8Uc69yMW");

export async function SendEmail(content, toEmail) {
  const templateParams = {
    content: content,
    to: !toEmail ? "chris@btwebgroup.com" : toEmail,
  };
  console.log(toEmail);
  const emailResponse = await emailjs.send(
    "service_9dpngmi",
    "template_izthnsq",
    templateParams
  );

  return emailResponse;
}
