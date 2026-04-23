import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { NavLink } from 'react-router-dom'
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
                    localStorage.setItem("Profile",JSON.stringify(response.data.user));
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
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign in.</p>
                <TextField label="Email" variant="outlined" type="email" autoComplete="off" {...register("Email")} color="secondary" size='small'/>
                <TextField label="Password" variant="outlined" type="password" autoComplete='off' {...register("Password")} color="secondary" size='small'/>
                <button type="submit" className='login-btn'>{isSubmitting ? (
                    <div className="login-load"></div>
                ) : "Login"}</button>
                <div className="signup-forgot">
                    <NavLink to='/signup'>create new account?</NavLink>
                </div>
            </form>
            {comp&&(
                <div className="toast-success">
                    <h4>Successfully logged in!</h4>
                </div>
            )}
        </div>
    )
}

export default Login
