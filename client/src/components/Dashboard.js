import React, { useState,useEffect } from "react";
import PropTypes from 'prop-types';
import { connect , useSelector} from "react-redux";
import { logoutUser } from "../actions/authActions";
import {checkIn} from '../actions/checkActions';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import moment from 'moment';
import {Link} from 'react-router-dom';
const Dashboard = (props) =>{

    const [data,setData] = useState()
    const [user,setUser] = useState({name:'',img:''})
    const [ctime,setTime] = useState();
    const [checkT,setCheckT] = useState();
    const [total,setTotal] = useState();
    const [remain,setRemain] = useState();
    // const [outTime,setOutTime] = useState();
    const [isDisabled,setDisabled] = useState(false);
    const [Puser,setpUser] = useState([])

    const name =  useSelector( state=> state.auth.user.name);
    const img = "https://ui-avatars.com/api/?name="+name
   useEffect(()=>{
    toasty()
    setUser({name:name,img:img})
   
   },[])

   useEffect(()=>{
    axios.get("api/user/allusers")
    .then((res)=>{ setpUser(res.data)})
    .catch(err=>console.log(err))
   },[])

   const toasty =()=>{
    toast.success('Welcome '+name+'🧑‍💻')
   }

    function calc(checkoutTime){
        // setInterval(()=>{})
        var time = new Date();
        // const checkoutTime = moment(ctime).add(570,'minutes').format('hh:mm a');
        var f = checkoutTime;
        // var g = moment(time).format('hh:mm a')
        console.log(checkoutTime)
        console.log(moment(time,'hh:mm a'))
        var a = moment(f,'hh:mm a')
    var b = moment(time,'hh:mm a')
    console.log(b);
    var c = moment.duration(a.diff(b));
    var d = c.hours()+'Hours &  Minutes '+c.minutes();
        console.log(c.hours()+'Hours &  Minutes '+c.minutes())
        setRemain(d)
   }

//    useEffect(()=>{
//         calc()
//    },[])
//    setInterval(()=>{calc()},60000)
    const onCheckout = e =>{
        e.preventDefault();
        const cOut = new Date();
        var checkTime = moment(cOut).format('hh:mm a');
        setCheckT(checkTime)
        var a = moment(ctime,'hh:mm a')
        console.log(a)
        var b = moment(checkTime,'hh:mm a')
        var overAll = moment.duration(b.diff(a));
        console.log(overAll.minutes());
         setTotal(overAll.hours()+' '+overAll.minutes());
    } 


    const onCheck = e =>{
        e.preventDefault();
        const time = new Date()
        const checkoutTime = moment(time).add(570,'minutes').format('hh:mm a');
        console.log(checkoutTime)
      
        moment.defaultFormat = 'hh:mm'
        console.log(time)
        var timeNow = moment(time).format('hh:mm a');
        console.log(timeNow)
        var a = moment('6:00 pm','hh:mm a')
        var b = moment(time,'hh:mm a')
        var c = moment.duration(a.diff(b));
        calc(checkoutTime)
        console.log(checkoutTime)
        // console.log(outTime)
        setInterval(()=>{calc(checkoutTime)},60000)
        console.log(c.hours()+'Hours &  Minutes '+c.minutes())
        console.log(moment('08:30',moment.defaultFormat).fromNow())
        setTime(timeNow);
        // setDisabled(true)
        // setOutTime(checkoutTime)
        // setTimeout(()=>{ var d = c.hours()+'Hours &  Minutes '+c.minutes();
        // console.log(c.hours()+'Hours &  Minutes '+c.minutes())
        // setRemain(d)},1000)
        const check = {
            timeNow
        }
        props.checkIn(check)
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
        <button onClick={onCheck} disabled={isDisabled}>Check In</button>
        <button onClick={onCheckout}>CheckOut</button>
        <p>Your Check In: {ctime}</p>
        <p>Your Check Out: {checkT}</p>
        <p>Your OverAll Work time: {total} minutes </p>
        <p>Your Remaining Time {remain}</p>
        <br/><br/>
        <table>
            <thead>
                <tr>
                    <td>NO</td>
                    <td>Name</td>
                    <td>Edit</td>
                </tr>
            </thead>
            <tbody>
                {Puser.map((item,index)=>{
                    return(
                    <>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td><Link to={"/edit/"+item._id}>Edit</Link></td>
                    </tr>
                    </>)
                })}
            </tbody>
        </table>
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

export default connect(mapStateToProps,{logoutUser,checkIn})(Dashboard);