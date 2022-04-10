const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const handler = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await handler.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email Sent Successfully!");
  } catch (error) {
    console.log("Email Not Sent!");
    console.log(error);
  }
};
