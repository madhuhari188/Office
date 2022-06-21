import React, { useEffect, useState } from "react";
import Papa, { parse } from 'papaparse'

export default function CSV (){

    var [car,setCar] = useState([]);
    var [arr,setArr] = useState([])
    
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

    useEffect (()=>{
      var va=[]
      car.map((item)=>{
        if (item.URL.match(/google\.com|g,/gm) !== null){
           va += item.URL
            console.log(va)
        }
        return null
      })
      setArr(va)
      console.log(car)
     },[car])

    return(
        <>
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
        {/* {v.map(item=>
            <><p>{item.URL}</p><p>{item['Active(sec)']}</p><p>{item['Total(sec)']}</p><p>{item.Domain}</p><p>{item.Page}</p><p>{item.Title}</p></>
        )} */}
        {}
        </>
    )
}