import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { ToastContainer,toast } from "react-toastify";


export default function Edit (props) {
    const [user,setUser] = useState({
        name:'',mail:'',empId:''
    })
    const [useP,setUsep] = useState([])
    const {id} = useParams();
    console.log(id);

    const handleOnChange = event =>{
        const {name,value} = event.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    useEffect(()=>{
        axios.get('/api/user/'+id)
        .then(res=>{
            setUser({
                name: res.data.name,
                mail: res.data.email,
                empId: res.data.empId
            })
        })
        .catch(err=>console.log(err))
    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        const userData = {
            name: user.name,
            email: user.mail,
            empId: user.empId
        }

        axios.post('/api/user/update/'+id,userData)
        .then(res=>toast.success(res.data))
        .catch(err=>toast.error(err))

        // window.location = "/dashboard";
        
    }

    return(
        <>
          <Box component="span" sx={{ p: 2}}>
        <form onSubmit={handleSubmit}>
            <TextField name="name" onChange={handleOnChange} label="Name" variant='outlined' value={user.name} />
            <TextField name="mail" onChange={handleOnChange} label="Email" variant='outlined' value={user.mail} />
            <TextField name="empId" onChange={handleOnChange} label="Employee Id" variant='outlined' value={user.empId} />
            <Button variant='contained' type="submit" >Update</Button>
        </form>
        </Box>
        <ToastContainer/></>
    )
}