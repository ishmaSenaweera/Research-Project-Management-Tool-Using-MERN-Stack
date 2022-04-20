const nodemailer = require("nodemailer");

//send email function
async function sentEmail(email, subject, text) {
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
}

//send email verification
async function sendVeri(email, name, id, token) {
  try {
    const url = `Dear ${name},\nVerify your email address \n${process.env.BASE_URL}login/verify/${id}/${token}`;
    const result = await sentEmail(email, "Email Verification", url);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//send Successfully Verified email
async function sendSuccVeri(email, name) {
  try {
    const message = `Dear ${name},\nCongratulations, your account has been successfully activated.`;
    const result = await sentEmail(email, "Successfully Verified", message);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//send Successfully Updated email
async function sendSuccUp(email, name) {
  try {
    const message = `Dear ${name},\nYour account has been successfully updated.`;
    const result = await sentEmail(email, "Successfully Updated", message);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//send Successfully change password email
async function sendSuccChPas(email, name) {
  try {
    const message = `Dear ${name},\nYour account password has been successfully changed.`;
    const result = await sentEmail(email, "Successfully Password Changed", message);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//send Successfully Deleted email
async function sendSuccDel(email, name) {
  try {
    const message = `Dear ${name},\nYour account has been successfully deleted.`;
    const result = await sentEmail(email, "Successfully Deleted", message);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//send Successfully Updated By Admin email
async function sendSuccUpAd(email, name) {
  try {
    const message = `Dear ${name},\nYour account has been updated by admin.`;
    const result = await sentEmail(email, "Successfully Updated By Admin", message);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//send Successfully Deleted By Admin email
async function sendSuccDelAd(email, name) {
  try {
    const message = `Dear ${name},\nYour account has been deleted by admin.`;
    const result = await sentEmail(email, "Successfully Deleted By Admin", message);

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  sentEmail,
  sendVeri,
  sendSuccVeri,
  sendSuccUp,
  sendSuccChPas,
  sendSuccDel,
  sendSuccUpAd,
  sendSuccDelAd,
};
