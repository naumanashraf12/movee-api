const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transportor = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "191a182b2479cf",
      pass: "fad0ee05571bf3",
    },
  });
  const message = {
    from: `Movee API <from@example.com>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transportor.sendMail(message);
};
module.exports = sendEmail;
