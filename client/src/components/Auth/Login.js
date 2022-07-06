import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import {useNavigate} from 'react-router-dom'


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
    })
    

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
        <form onSubmit={onsubmit}>
            <label>Email</label>
            <input onChange={handleOnChange} value={log.email} name="email" type="email"/>
            <label>Password</label>
            <input onChange={handleOnChange} value={log.password} name="password" type="password"/>
            <button type='submit'>Submit</button>
        </form>
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