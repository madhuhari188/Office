import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function Login() {

    const [values,setValues] = useState({email:'',password:''})

    const handleSubmit = (e) =>{
        e.preventDefault();

        const data ={...values}
        console.log(data) 

        // axios.defaults.withCredentials = true;
        
        axios.post('http://localhost:5000/user/register',data,{
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': 'http://localhost:3000', 'Content-Type': 'application/json'
    }})
        .then(()=>toast.success('super'))
        .catch((err)=>toast.error("Try Again:"+err))

    }

  return (
  <>
    <form onSubmit={handleSubmit}>
       <div> <label>email</label>
        <input type="email" name='email' placeholder='email@email.com'
        onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
        /></div>
        <div> <label>Password</label>
        <input type="password" name='password' placeholder='1234'
        onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
        /></div>
        <button type='submit'>Submit</button>
    </form>
    <ToastContainer/>
  </>
  )
}
