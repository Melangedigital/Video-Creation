// import express from "express";
// import nodemailer from "nodemailer";
// import bodyParser from "body-parser";

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(bodyParser.json());

// // CORS middleware to allow requests from your React app (update with your frontend URL)
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "localhost:5173/");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// // app.post("/send-email", async (req, res) => {
// //   const { name, email, phone, need, budget, message } = req.body;

// //   // Create a nodemailer transporter
// //   const transporter = nodemailer.createTransport({
// //     service: "Gmail",
// //     auth: {
// //       user: "hello@melangedigital.in",
// //       pass: "fvvc zduy fcuu rnxv",
// //     },
// //   });

// //   // Define email options
// //   const mailOptions = {
// //     from: `${name}`,
// //     to: "hello@melangedigital.in",
// //     subject: "New Form Submission",
// //     text: `
// //       Name: ${name}
// //       Email: ${email}
// //       Phone: ${phone}
// //       Need: ${need}
// //       Budget: ${budget}
// //       Message: ${message}
// //     `,
// //   };

// //   try {
// //     const info = await transporter.sendMail(mailOptions);
// //     console.log("Email sent:", info.messageId);
// //     res.status(200).json({ success: true });
// //   } catch (error) {
// //     console.error("Error sending email:", error);
// //     res.status(500).json({ success: false, error: "Internal Server Error" });
// //   }
// // });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// server.js
import express, { json } from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(cors());

app.post("/submit-form", async (req, res) => {
  const { fullName, phoneNumber, email, companyName } = req.body;

  // Your CRM webhook URL and authorization key
  const webhookUrl = "https://api.lio.io/v1/integrations/bUmVU0KqVd2daM8mREv5";
  const authorizationKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbmlzYXRpb25JZCI6Im9yZ19PWDV2UlVsbElvUU10Yzg5cXpscmhXdnREUWsyXzE3MDY2ODU4NTAiLCJpYXQiOjE3MDY2ODU4NTF9.PDTcV6jEJbGS_DuDwhDyv44100_-kj0JWJ9-ubEGij0";

  try {
    // Make a POST request to the CRM webhook URL
    const response = await axios.post(
      webhookUrl,
      {
        "Full Name": fullName,
        "Phone no.": phoneNumber,
        Email: email,
        "Company Name": companyName,
      },
      {
        headers: {
          Authorization: `Bearer ${authorizationKey}`,
        },
      }
    );

    // Handle CRM response as needed
    console.log("CRM Response:", response.data);

    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form to CRM:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
