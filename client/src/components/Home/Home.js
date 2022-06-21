import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";

export default function Home (){

    const notify = () =>{
    toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });
}

    const sub =()=>{
        axios.get('http://localhost:5000/analyst/')
        .then((res)=>{
            if(res.status==200){
                toast.success('Super!!!')
            }
        })
        .catch( err=>toast.error("Try Again :("+err))
    }

    return (
      <div>
        <button onClick={sub}>Notify !</button>
        <ToastContainer />
      </div>
    );
}