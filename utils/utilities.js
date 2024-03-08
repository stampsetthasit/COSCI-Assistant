const nodemailer = require("nodemailer");

const mailer = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: to,
    subject: `COSCI Assistant - ${subject}`,
    html: html,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = mailer;
