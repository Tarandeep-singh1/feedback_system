// email service code (e.g., in `utils/emailService.js`)
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email_address',
    pass: 'passcode of your email address', // Make sure these credentials are correct
  },
});

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: 'example@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Nodemailer error:', error); // Log the Nodemailer error
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOtpEmail };
