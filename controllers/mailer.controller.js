import nodemailer from 'nodemailer';
import crypto from 'crypto'; // For generating tokens
import { UserRegistration } from '../models/userRegistration.models.js';

const EMAIL_FROM = process.env.EMAIL_FROM; // Sender email address

// Set up the email transporter
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: "a71899af5ab622",
    pass: "6fc90e1362b7ad"
  }
});

const sendLoginEmail = (email, token, password) => {
  const loginLink = `http://localhost:3000/api/v1/verify/${token}`;
  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Company Registration Successful',
    text: `Your registration is successful. You can log in using the following link: ${loginLink}. Your email is ${email} and your password is ${password}.`,
    html: `<p>Your registration is successful. You can log in using the following link:</p><a href="${loginLink}">${loginLink}</a><p>Your email is ${email} and your password is ${password}.</p>`
  };

  return transporter.sendMail(mailOptions);
};

const sendEmailController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate a token for the login link
    const token = crypto.randomBytes(20).toString('hex');

    // Find the user by email and save the token
    const user = await UserRegistration.findOne({ email });
    if (user) {
      user.verificationToken = token;
      user.tokenExpiration = Date.now() + 3600000; // 1 hour from now
      await user.save();
    }

    // Send the login email
    await sendLoginEmail(email, token, password);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyAdminEmailController = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await UserRegistration.findOne({ verificationToken: token, tokenExpiration: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    user.status = 'active';
    user.verificationToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    // Redirect to login page with a success parameter
    return res.redirect('http://localhost:5173/companyLogin?verified=true');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { sendEmailController, verifyAdminEmailController };
