const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const OTP = require('../Models/OTP')
const sendEmail = require('../OTPsender/OTPsender');
dotenv.config();
const CreateUser = async (req, res) => {
    try {
        const { name, password, phoneNumber, emailID, confirmpass } = req.body;
        const userexists = await User.findOne({ emailID })
        if (userexists) {
            return res.status(404).json({
                message: "User Already exists"
            })
        }
        if (!password || !name || !phoneNumber || !emailID) {
            return res.status(500).json({
                message: "Something went wrong"
            })
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailID)) {
            return res.status(404).json({
                message: "Invalid email id"
            })
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return res.status(404).json({
                message: "Password must be min 8 chars, at least 1 uppercase, 1 lowercase, 1 number, 1 special char"
            })
        }
        if (confirmpass !== password) {
            return res.status(404).json({
                message: "Password not Matched"
            })
        }
        if (phoneNumber.length !== 10) {
            return res.status(404).json({
                message: "Phone Number Must be 10 Digits"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const Hash = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            password: Hash,
            phoneNumber,
            emailID
        })
        const token = jwt.sign({ id: newUser._id, email: newUser.emailID }, process.env.SECRET);
        res.cookie("token", token);
        await newUser.save();
        res.status(200).json({
            newUser: newUser,
            message: "User is Created"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const sendOTP = async (req, res) => {
    try {
        const { Email } = req.body;
        const checker = await User.findOne({ emailID:Email })
        if (!checker) {
            return res.status(404).json({
                message: "user is not found"
            })
        }
        const createOTP = Math.floor(100000 + Math.random() * 999999);
        const otpsend = new OTP({ email_id: Email, otp_no: createOTP })
        await otpsend.save();
        sendEmail(Email, "otpsend", "Hi User");
        res.status(200).json({
            otpsend: otpsend
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const verifyOTP = async (req, res) => {
    try {
        const { OTP, Email } = req.body;
        const otpchecker = await OTP.findOne({ email_id: Email, otp_no: OTP });
        if (!otpchecker) {
            return res.status(404).json({
                message: "Invalid Email ID"
            })
        }
        res.status(200).json({
            otpchecker: otpchecker
        })
    } catch (error) {

    }
}
const LoginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                message: "give valid email id and password"
            })
        }
        const existsUser = await User.findOne({ emailID: Email });
        if (!existsUser) {
            return res.status(404).json({
                message: "user is not found"
            })
        }
        const verifypass = await bcrypt.compare(Password, existsUser.password);
        if (!verifypass) {
            return res.status(404).json({
                message: "Password mismatch"
            })
        }
        const token = jwt.sign({ id: existsUser._id, email: existsUser.emailID }, process.env.SECRET);
        res.cookie("token", token);
        res.status(200).json({
            message: "welcome user",
            user: existsUser,

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            message: "User is Logout"
        })
    } catch (error) {

    }
}
module.exports = { CreateUser, LoginUser, Logout, sendOTP, verifyOTP }