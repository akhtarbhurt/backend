import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

const secret = process.env.JWT_SECRET_KEY;

const sendLoginLink = async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.status(400).json({ error: "Registration failed" });
    }

    // Generate token
    const token = JWT.sign({ id: user._id, email: user.email }, secret);

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "06c825a0521772",
            pass: "5e823ce520c012"
        }
    });

    // Mail options
    const mailOptions = {
        from: 'muhammadriyansadiq786@gmail.com',
        to: user.email,
        subject: 'Welcome! Please log in',
        html: `<p>Click <a href="http://localhost:5173/login">here</a> to login</p>`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error from transporter", error);
            return res.status(500).json({ error: "Failed to send email" });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).json({ success: "User registered and login link sent to email" });
        }
    });
};

export default sendLoginLink;