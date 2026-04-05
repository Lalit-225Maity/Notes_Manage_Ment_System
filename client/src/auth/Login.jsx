import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import './Login.css'
import { useState } from 'react'
const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();
    const [comp, setcomp] = useState(false);
    const userLogin = async (data) => {
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const response = await axios.post('/api/login', data);
                    console.log(response.data.user);
                    localStorage.setItem("User", JSON.stringify(response.data.user.name));
                    setcomp(true);
                  setTimeout(() => {
                       navigate('/');
                  }, 3000);
                    resolve();
                } catch (error) {
                    setcomp(false);
                    reject();
                }

            }, 3000);
        })
    }
    return (
        <div className='login'>
            <form onSubmit={handleSubmit(userLogin)}>
                <TextField label="Email" variant="outlined" type="email" autoComplete="off" {...register("Email")} />
                <TextField label="Password" variant="outlined" type="password" autoComplete='off' {...register("Password")} />
                <button type="submit">{isSubmitting ? (
                    <div className="login-load"></div>
                ) : "Login"}</button>
            </form>
            {comp&&(
                <div className="toast-success">
                    <h4>Welcome User</h4>
                </div>
            )}
        </div>
    )
}

export default Login
