import React, { useEffect, useState } from "react";
import Papa, { parse } from 'papaparse';
import {useSelector} from 'react-redux' 
import axios from 'axios';
import convert from 'convert-seconds-to-human'
import {Link} from 'react-router-dom';
import moment from 'moment';

export default function CSV (){

    const [car,setCar] = useState([]);
    const [arr,setArr] = useState({Totalsec:'',AciveSec:''});
    const [soo,setSoo] = useState([]);
    // const [total,setTotal] = useState([]);
    const [report,setReport] = useState([]);
    const [start,setStart] = useState({startDate:'',endDate:'',empId:''})
    const style ={border:'1px solid #000'}
    const empId=  useSelector( state=> state.auth.user.empId)
    const handleFileUpload = (e) =>{
        const files = e.target.files;
        var store;
        console.log(files);
         var va=[];var sa,sb,aa ;
            console.log(files[0]);
            Papa.parse(files[0], {
                header:true,column: true,
              complete: function(results) {
                setCar((existing) => [...existing, ...results.data])
                return  results.data
              }}
              
            )
             
        //     var res =  Papa.parse(files[0],{header:true})
        //     console.log(res);
        //   console.log(store)
        // //  var rrr = car;
        // //  var vr = []
        // //  for(var i=0;i<rrr.length;i++){
        // //     if(rrr[i]){
        // //         vr += rrr[i]
        // //         console.log(vr)
        // //     }
        // //     setArr({URL:vr})
        // //  }

          // car.map((item)=>{
          //   if (item.URL.match(/google\.com|g,/gm) !== null){
          //       setArr({URL:item.URL})
                
          //   }
          //   return null
          // })

        //  Papa.parse(files[0],{header:true,complete: function(results){
        //     setV(results)
        // }})
        // car.map((item)=>{
        //   if (item.URL.match(/google\.com|g,/gm) !== null){
        //       setArr((existing)=>[...existing,...item.URL])
              
        //   }
        //   return null
        // })
        // console.log(car)
    }

    

    const onSave = (e) =>{
        e.preventDefault();
        const total = arr.Totalsec
        const active = arr.AciveSec

         var currentDate = new Date();
         var startDate = new Date(currentDate.getFullYear(), 0, 1);
        var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));
             
        var weekNumber = Math.ceil(days / 7);
     

        const totalsec = convert(total,'cal')
        const activesec = convert(active,'cal')

        const time1 = totalsec.hours+'hr:'+totalsec.minutes+'min:'+totalsec.seconds+'sec'
        const time2 = activesec.hours+'hr:'+activesec.minutes+'min:'+activesec.seconds+'sec'

        const data ={
            TotalTime:total,
            ActiveTime:active,
            week:weekNumber
        } 

        axios.post("/analyst/add", data)
        .then(()=>console.log('Success'))
        .catch(err=>console.log('Error:'+err))

        console.log(data)
    }

    // useEffect(()=>{
      
    // },[])

    useEffect (()=>{
      var va=0;var sb = 0;var za=0;
      car.map((item)=>{
        if (item.URL.match(/sagemaker\.aws\/#\/work\//gm) !== null){
           va += Number(item['Active(sec)'])
           sb += Number(item['Total(sec)'])
        }
        if (item.URL.match(/inAll/gm) !== null){
           za = item['Active(sec)']
        }
       
        return null
      })
      console.log(sb)
      console.log(za)
      console.log(va)
      const activesec = convert(va,'cal')
      setArr({Totalsec:sb,AciveSec:activesec})
      console.log(car)
      console.log(moment('2022-07-07T18:30:00.000Z').format("YYYY MM DD"))
     },[car])

     useEffect(()=>{
      cal();
     },[])

     const onDate = e =>{
      const {name,value} = e.target;
      setStart({
        ...start,
        [name]:value
      })
      // setStart({[e.target.name]:e.target.value})
     } 

     const onSearch=(e)=>{
      e.preventDefault();
      console.log(start.startDate,start.endDate,start.empId)
      const sDate = start.startDate;
      const eDate = start.endDate;
      const empId = start.empId;
      if(empId){
        axios.get('http://localhost:5000/analyst/fetch/report/?sDate='+sDate+'&eDate='+eDate+'&empId='+empId)
        .then((res)=>{
          console.log(res.data)
          setReport(res.data)
        })
        .catch(err=>console.log('Error: '+err))
      }else{
        axios.get('http://localhost:5000/analyst/fetch/date/?sDate='+sDate+'&eDate='+eDate)
        .then((res)=>{
          console.log(res.data)
          setReport(res.data)
        })
        .catch(err=>console.log('Error: '+err))
      }
      // console.log('http://localhost:5000/analyst/fetch/date/?sDate='+sDate+'&eDate'+eDate)
      
     }
     const cal=()=>{
      
      axios.get('http://localhost:5000/analyst/fetch/id?empId='+empId)
      .then((res)=>{
        const arr = {
          week: res.data.week
        }
        // setTotal(res.data.week)
        setSoo(res.data);
        console.log(soo)
      })

      
      // var time1= convert(so.ActiveTime,'cal')
      // console.log(time1)
    }
     console.log(report)
    // const rep = () =>{
    //   return(

        
    //   )
    // }

    useEffect(()=>{
      var so = 0;var sa =
      soo.map((item)=>{
          so += item.week;
          sa += item.TotalTime;
      })
      console.log(so)
      console.log(sa)
    })

    return(
        <>
        <style>{"table,th,td { border: 1px solid #000; border-collapse: collapse;text-align: center}"}</style>
        <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />

        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Total(sec)</th>
                    <th>Active(sec)</th>
                    <th>Domain</th>
                    <th>Page</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
            {car.map((item, index) => {
            if (item.URL.match(/sagemaker\.aws\/#\/work\//gm) !== null)
              return (
                <>
                  <tr id={index}>
                    <td>{item.URL}</td>
                    <td>{item["Total(sec)"]}</td>
                    <td>{item["Active(sec)"]}</td>
                    <td>{item.Domain}</td>
                    <td>{item.Page}</td>
                    <td>{item.Title}</td>
                  </tr>
                </>
              );
            return null;
          })}
            </tbody>
        </table>

        <form onSubmit={onSave}>
            <button type="submit">Submit</button>
        </form>
        <form onSubmit={onSearch}>

        <input type='date' name='startDate' value={start.startDate} onChange={onDate}  />
        <input type='date' name='endDate' value={start.endDate} onChange={onDate}  />
        <input type='text' name='empId' value={start.empId} onChange={onDate}  placeholder='emp Id' />
        <button type="submit" >Search</button>
        </form>
        
        {/* {v.map(item=>
            <><p>{item.URL}</p><p>{item['Active(sec)']}</p><p>{item['Total(sec)']}</p><p>{item.Domain}</p><p>{item.Page}</p><p>{item.Title}</p></>
        )} */}
        {/* {arr} */}
       <div><ol> {soo.map((item,index)=>(
          
            <li key={index}>{item.week}</li>
         
       )
         )} </ol>
         <p>{arr.AciveSec.hours} Hours:{arr.AciveSec.minutes} Minutes</p>
         </div>
         <table>
          {/* <thead> */}
            <tr>
                    <th> S.No</th>
                    <th>Emp ID</th>
                    <th>Active Time</th>
                    <th>Total Time</th>
                    <th>Week</th>
                    <th>Date</th>
            </tr>
            {/* </thead> */}
            <tbody>
        {report.map((item, index) => {
          return(
          <>
            <tr id={index}>
              <td>{index+1}</td>
              <td>{item.empId}</td>
              <td>{moment.utc(moment.duration(item.TotalTime,'seconds').as('milliseconds')).format('HH:mm:ss')}</td>
              <td>{moment.utc(moment.duration(item.ActiveTime,'seconds').as('milliseconds')).format('HH:mm:ss')}</td>
              <td>{item.week}</td>
              <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
          </>)
    })}
    </tbody>
        </table>
        {report.map((item)=>{
          <ul>
            <li>{item.ActiveTime}</li>
          </ul>
        })}
        </div>
        </>
    )
}