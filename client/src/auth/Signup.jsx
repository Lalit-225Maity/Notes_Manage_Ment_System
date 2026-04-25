import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import axios from 'axios';
import { useState } from 'react';
const Signup = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const [msg, setmsg] = useState('');
    const [correct, setcorrect] = useState(false);
    const createAccount = async (data) => {
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await axios.post('/api/create', data);
                    console.log(response.data);
                    const mydata = {
                        ...data,
                        Email: data.emailID
                    }
                    const response_2 = await axios.post('/api/otpsend', mydata);
                    console.log(response_2.data);

                    navigate('/otp',{state:{Email:data.emailID}});
                    setcorrect(false);
                    resolve();

                } catch (error) {

                    setcorrect(true);
                    const msgg = error.response.data.message;
                    setmsg(msgg);

                    reject();
                }
            }, 3000);
        })

    }
    return (
        <div className='signup'>
            <form onSubmit={handleSubmit(createAccount)} autoComplete="off">
                <label>Enter Your Name</label>
                <TextField label="Name" variant="outlined" {...register("name")} type='text' autoComplete="off" color="dark" size='small' />
                <label>Enter Your Phone Number</label>
                <TextField label="Phone Number" variant="outlined" type="tel" {...register("phoneNumber")} autoComplete='off' color="dark" size='small' />
                <label>Enter Your Email ID</label>
                <TextField label="Email" variant="outlined" {...register("emailID")} type="email" autoComplete='off' color="dark" size='small' />
                <label>Create a Password</label>
                <TextField label="Password" variant="outlined" {...register("password")} type="password" autoComplete='off' color="dark" size='small' />
                <label>Confirm Password</label>
                <TextField label="Re-Type Password" variant="outlined" {...register("confirmpass")} type="password" autoComplete='off' color="dark" size='small' />
                <button type="submit">{isSubmitting ? (
                    <div className="loading-create"></div>
                ) : "create account"}</button>
                {correct && <p className='err-msg'>{msg}</p>}
            </form>
        </div>
    )
}

export default Signup
