import React, { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import { connect , useSelector} from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import moment from 'moment';
const Dashboard = (props) =>{

    const [data,setData] = useState()
    const [user,setUser] = useState({name:'',img:''})
    const [time,setTime] = useState();
    const [checkT,setCheckT] = useState();
    const [total,setTotal] = useState();

    const name =  useSelector( state=> state.auth.user.name);
    const img = "https://ui-avatars.com/api/?name="+name
   useEffect(()=>{
    toasty()
    setUser({name:name,img:img})
    
   },[])

   const toasty =()=>{
    toast.success('Welcome '+name)
   }

   const calc = ()=>{
    var a = moment(time,'hh:mm a')
    var b = moment(checkT,'hh:mm a')
    var overAll = moment.duration(b.diff(a));
    console.log(overAll.minutes());
     setTotal(overAll.hours());
   }

//    useEffect(()=>{
//     calc();
//    })

    const onCheckout = e =>{
        e.preventDefault();
        const cOut = new Date();
        var checkTime = moment(cOut).format('hh:mm a');
        setCheckT(checkTime)
        var a = moment(time,'hh:mm a')
        var b = moment(checkTime,'hh:mm a')
        var overAll = moment.duration(b.diff(a));
        console.log(overAll.minutes());
         setTotal(overAll.hours()+' '+overAll.minutes());
    } 


    const onCheck = e =>{
        e.preventDefault();
        const time = new Date()
        moment.defaultFormat = 'hh:mm'
        console.log(time)
        var timeNow = moment(time).format('hh:mm a');
        console.log(timeNow)
        var a = moment('6:00 pm','hh:mm a')
        var b = moment(time,'hh:mm a')
        var c = moment.duration(a.diff(b));
        console.log(c.hours()+'Hours &  Minutes '+c.minutes())
        console.log(moment('08:30',moment.defaultFormat).fromNow())
        setTime(timeNow);
    }

    const onLogout = e =>{
        e.preventDefault();
        props.logoutUser();
    }
    
        // const {user} = props.auth 
    return(
        

        <><h1>Hai {user.name} You are Logged In Successfully</h1>
        <img src={user.img} style={{borderRadius:"50%"}} alt={user.name}/>
        <button
            onClick={onLogout}
        >
            Logout
        </button><br/>
        <button onClick={onCheck}>Check In</button>
        <button onClick={onCheckout}>CheckOut</button>
        <p>Your Check In: {time}</p>
        <p>Your Check Out: {checkT}</p>
        <p>Your OverAll Work time: {total} minutes </p>
        <ToastContainer/></>
    )

}

Dashboard.prototype = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(Dashboard);