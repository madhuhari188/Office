import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import {useNavigate} from 'react-router-dom'
import { ToastContainer,toast } from "react-toastify";


const Login =(props)=>{

    const [log,setLog] = useState({
        email:"",password:""
    });

    const navigate = useNavigate()

    const [err,setErr] = useState({})
    const handleOnChange = event =>{
        const {name,value} = event.target;
        setLog({...log,[name]:value});
    }

    useEffect(()=>{
        if(props.auth.isAuthenticated){
            navigate('/dashboard')
        }
        // if(props.errors){
        //     errFind()
        // }
        // if(props.errors){
        //     console.log(props.errors)
        //     toast.error(props.errors.email)
        //     toast.error(props.errors.password)
        //     toast.error(props.errors.passwordinCorrect)
        //     toast.error(props.errors.emailnotfound)
        //     setErr(props.errors)
        //  }
        // console.log(err)
    })
    useEffect(()=>{
        if(props.errors){
            console.log(props.errors)
            toast.error(props.errors.email)
            toast.error(props.errors.password)
            toast.error(props.errors.passwordinCorrect)
            toast.error(props.errors.emailnotfound)
            setErr(props.errors)
         }
    },[props.errors])
      
   const  onsubmit=e=>{
        e.preventDefault();
        const userData = {
            email: log.email,
            password: log.password
        }
        console.log(userData)
        props.loginUser(userData);
    };

    return(
       <> <form onSubmit={onsubmit}>
            <label>Email</label>
            <input onChange={handleOnChange} value={log.email} name="email" type="email"/>
            <label>Password</label>
            <input onChange={handleOnChange} value={log.password} name="password" type="password"/>
            <button type='submit'>Submit</button>
        </form>
         <ToastContainer/></>
    )

}

Login.prototype = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};

const mapStateToProps = useState =>({
    auth: useState.auth,
    errors: useState.errors
});

export default connect(mapStateToProps,{loginUser})(Login);