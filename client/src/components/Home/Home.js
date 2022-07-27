import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment'

export default function Home (){
  const [value, setValue] = useState(null);
  const [end, setEnd] = useState(null);
  const [name,setName] = useState([]);
  const [n,setN] = useState(null)
    const notify = () =>{
    toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });
}

    const handleChange = (event,value) => setN(value)

    const onShow = (e) =>{
      e.preventDefault();
      toast.success('Selected Date '+moment(value).format('YYYY MM DD'))
      toast.success('Selected Date '+moment(end).format('YYYY MM DD'))
      console.log(value,end,n)
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

    useEffect(()=>{
      userName();
    },[])    

    const userName = () =>{
      axios.get('api/user/users')
      .then((res)=>{
        setName(res.data)
      })
      console.log(name)
    }

    // const name = [
    //   'Madhu',
    //   'Mani',
    //   'Max',
    //   'Hari',
    //   'Naveen',
    //   'Kavin',
    //   'Mohan'
    // ]

    return (
      <div>
        <button onClick={sub}>Notify !</button><br/><br/>
        <form onSubmit={onShow}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        label="From"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        label="From"
        value={end}
        onChange={(newValue) => {
          setEnd(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        <br/>
        <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={name.map((option) => option.name)}
      
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="Employees Name" />}
        sx={{ width: '500px' }}
      /><br/>
        <button type="submit">Selected Date</button>
    </form>
    <br/>
    <br/>
    
        <ToastContainer />
      </div>
    );
}

