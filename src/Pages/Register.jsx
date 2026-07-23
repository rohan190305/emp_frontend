import React, { useState } from 'react'
import { registerUser } from '../api/auth'

export const Register = () => {
    const[formData , setFormData] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })


    }
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await registerUser(formData);

        console.log(response.data);

        alert("Registration successful");

        setFormData({
            name: "",
            email: "",
            password: ""
        });
    } catch (error) {
        console.log(error);
    }
};
  return (
    <div>
     <h2 className='text-2xl text-center text-blue-700'> Register</h2>
     <form action="" onSubmit={handleSubmit} >
        <div>
            <input className='border mb-2' type="text" name='name' value={formData.name} onChange={handleChange} placeholder=' enter your name' />
        </div>

        <div>
            <input className='border mb-2' type="email" name='email' value={formData.email} onChange={handleChange} placeholder=' enter email' />
        </div>
        <div>
            <input className='border mb-2' type="password" name='password' value={formData.password} onChange={handleChange} placeholder='enter password' />
        </div>
        
        <button className='border' type='submit'>Register</button>
        <div> AlreadyRegister ? <a href="/auth/login">Login</a></div>
     </form>

    </div>
  )
}
