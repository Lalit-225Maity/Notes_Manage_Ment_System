import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './OTP.css'
const OTP = () => {
    const { state } = useLocation();
    const { Email } = state || {};
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();

    const VerifyOTP = async (data) => {
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const existdata = {
                        ...data,
                        Email: Email
                    }
                    const response = await axios.post('/api/verifyotp', existdata);
                    console.log(response.data);
                    navigate('/login');
                    resolve();

                } catch (error) {
                    reject();
                    console.log(error.response.data.message);

                }
            }, 3000);
        })
    }
    return (
        <div className='otpverify'>
            <form onSubmit={handleSubmit(VerifyOTP)} >
                <h4>Verify Your Email Address</h4>
                <h4>Check Your Email & Enter OTP</h4>
                <div className="verification">
                    <TextField label="Enter 6-Digit Verification Code" variant="outlined" placeholder='enter verification code' size='small' sx={{ width: "300px" }} color="dark"  {...register("otp_no")} />
                    <button type='submit'>{isSubmitting ? (
                        <div className="check"></div>

                    ) : "verify"}</button>

                </div>

            </form>
        </div>
    )
}

export default OTP
