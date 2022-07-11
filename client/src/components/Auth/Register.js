import React,{useEffect, useState} from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

const Register = (props) =>{
    const navigate = useNavigate();
    const [reg,setReg] = useState({name:'',empId:'',email:'',password:'',password2:''});

    useEffect(()=>{
        if(props.auth.isAuthenticated){
            navigate('/dashboard')
        }
    })

    const handleOnChange = event =>{
        const {name,value} = event.target;
        setReg({...reg,[name]:value});
    }

    const  onsubmit=e=>{
        e.preventDefault();

        const userData = {
            name:reg.name,
            empId:reg.empId,
            email: reg.email,
            password: reg.password,
            password2: reg.password2
        }
        console.log(userData)
        props.registerUser(userData);
    };

    return(
        <form onSubmit={onsubmit}>
        <label>Name</label>
        <input onChange={handleOnChange} value={reg.name} name="name" type="text"/>
        <label>Employee ID</label>
        <input onChange={handleOnChange} value={reg.empId} name="empId" type="text"/>
        <label>Email</label>
        <input onChange={handleOnChange} value={reg.email} name="email" type="email"/>
        <label>Password</label>
        <input onChange={handleOnChange} value={reg.password} name="password" type="password"/>
        <label>Confirm Password</label>
        <input onChange={handleOnChange} value={reg.password2} name="password2" type="password"/>
        <button type='submit'>Submit</button>
        </form>
    )
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(Register)