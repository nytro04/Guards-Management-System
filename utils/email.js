const nodemailer = require("nodemailer");

/** Send mail to user
 * @param {Object} options
 */
const sendMail = async (options) => {
  // 1. Create a transporter *service that will send email eg. Gmail, yahoo, sendGrid, mailGun etc
  const transporter = nodemailer.createTransport({
    // service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //To use Gmail, you need to activate "less secure app" option in Gmail
  });

  // 2. Define email options
  const mailOptions = {
    from: "Francis Badasu <hello@guardsys.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // 3. Actually send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
