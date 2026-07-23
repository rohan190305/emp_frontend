import React, { useState } from 'react'
import { loginUser } from '../api/auth'
import { createToken } from '../token/token'
import {  useNavigate } from 'react-router-dom'

export const Login = () => {
    const [Login , SetLogin] = useState({
        email:'',
        password:''
    })
     const handleChange = (e) =>{
        SetLogin({
            ...Login,
            [e.target.name]:e.target.value
        })
    }
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await loginUser(Login);
            createToken(response.data.token);

            console.log(response.data);
    
            alert("login successful");
    
            SetLogin({
                
                email: "",
                password: ""
            });
            navigate("/dashboard" )
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        <h2 className='text-2xl text-center text-blue-700'> Login</h2>
     <form action="" onSubmit={handleSubmit}>
        <div>
            <input className='border mb-2' type="email" name='email' value={Login.email} onChange={handleChange} placeholder=' enter email' />
        </div>
        <div>
            <input className='border mb-2' type="password" name='password' value={Login.password} onChange={handleChange} placeholder='enter password' />
        </div>
        
        <button className='border' type='submit'>Login</button>
        <div> Not Registered ? <a href="/auth/register">Register</a></div>
     </form>
    </div>
  )
}
