const nodemailer = require('nodemailer');

exports.sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adylmailer@gmail.com',
      pass: 'adylmarket_22',
    },
  });

  // <adylmailer@gmail.com>
  const mailOptions = {
    from: `Adylmarket`,
    to: `${options.to}`,
    subject: 'Adylmarket Verification',
    text: `Your Verification Code: ${options.code}`,
  };

  await transporter.sendMail(mailOptions);
};