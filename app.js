const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("", async (req, res) => {
  res.send("v0.0.1 " + process.env.EMAIL);
});

app.post("/voc/send-email", async (req, res) => {
  const { message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
    });

    await transporter.sendMail({
      from: "jaseeldevops@gmail.com",
      to: "jaseelmanamulli@gmail.com",
      subject: "VOC New Contact Form Submission",
      text: "",
      html: message,
    });

    await transporter.sendMail({
      from: "jaseeldevops@gmail.com",
      to: "jaseelmanamulli@gmail.com",
      subject: "VOC New Contact Form Submission",
      text: "",
      html: message,
    });

    res
      .status(200)
      .send({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
