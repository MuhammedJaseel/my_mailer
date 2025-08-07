const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// POST API to send email
app.post("/voc/send-email", async (req, res) => {
  const { message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
    });

    res
      .status(200)
      .send({ success: true, message: "Email sent successfully!" });

    await transporter.sendMail({
      from: "jaseeldevops@gmail.com",
      to: "jaseelmanamulli@gmail.com",
      subject: "VOC New Contact Form Submission",
      text: message,
    });

    await transporter.sendMail({
      from: "jaseeldevops@gmail.com",
      to: "jaseelmanamulli@gmail.com",
      subject: "VOC New Contact Form Submission",
      text: "",
      html: message,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

console.log(process.env.EMAIL, process.env.PASSWORD);
