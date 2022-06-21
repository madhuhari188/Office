import React, { useEffect, useState } from "react";
import Papa, { parse } from 'papaparse'
import axios from 'axios';
import convert from 'convert-seconds-to-human'

export default function CSV (){

    const [car,setCar] = useState([]);
    const [arr,setArr] = useState({Totalsec:'',AciveSec:''});
    const [soo,setSoo] = useState([]);
    const [total,setTotal] = useState([]);
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

        axios.post("http://localhost:5000/analyst/add", data)
        .then(()=>console.log('Success'))
        .catch(err=>console.log('Error:'+err))

        console.log(data)
    }

    // useEffect(()=>{
      
    // },[])

    useEffect (()=>{
      var va=0;var sb = 0
      car.map((item)=>{
        if (item.URL.match(/google\.com|g,/gm) !== null){
           va += Number(item['Active(sec)'])
           sb += Number(item['Total(sec)'])
        }
        return null
      })
      console.log(sb)
      console.log(va)
      setArr({Totalsec:sb,AciveSec:va})
      console.log(car)
     
     },[car])

     useEffect(()=>{
      cal();
     },[])

     

     const cal=()=>{

      axios.get('http://localhost:5000/analyst/')
      .then((res)=>{
        const arr = {
          week: res.data.week
        }
        setTotal(res.data.week)
        setSoo(res.data);
        console.log(soo)
      })

      
      // var time1= convert(so.ActiveTime,'cal')
      // console.log(time1)
    }
    useEffect(()=>{
      var so = 0;var sa =0
      soo.map((item)=>{
          so += item.week;
          sa += item.TotalTime;
      })
      console.log(so)
      console.log(sa)
    })

    return(
        <>
        <div>
        <input type="file" accept=".csv" onChange={handleFileUpload} />

        <table>
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Active(sec)</th>
                    <th>Total(sec)</th>
                    <th>Domain</th>
                    <th>Page</th>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>
            {car.map((item, index) => {
            if (item.URL.match(/google\.com|g,/gm) !== null)
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
        {/* {v.map(item=>
            <><p>{item.URL}</p><p>{item['Active(sec)']}</p><p>{item['Total(sec)']}</p><p>{item.Domain}</p><p>{item.Page}</p><p>{item.Title}</p></>
        )} */}
        {/* {arr} */}
       <div> {soo.map((item,index)=>(
          <ol key={index}>
            <li>{item.week}</li>
          </ol>
       )
         )}
         </div></div>
        </>
    )
}