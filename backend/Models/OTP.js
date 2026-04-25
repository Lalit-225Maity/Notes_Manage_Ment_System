const { Schema, model } = require('mongoose');
const OTP = new Schema({
    email_id: {
        type: String
    },
    otp_no: {
        type: Number
    },
    expireAt:{
        type:Date,
        default:Date.now,
        expires:300
    }
},{timestamps:true})
const newOTP=model("OTP",OTP);
module.exports=newOTP;