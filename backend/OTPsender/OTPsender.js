const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const OTPsender = async (Email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS

            }
        })
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: Email,
            subject,
            text: message
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = OTPsender