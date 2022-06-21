import React, { useState } from "react"

import { useCSVReader } from "react-papaparse"

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  browseFile: {
    width: "20%"
  },
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%"
  },
  remove: {
    borderRadius: 0,
    padding: "0 20px"
  },
  progressBarBackgroundColor: {
    backgroundColor: "red"
  }
}

export default function CSV2() {
  const { CSVReader } = useCSVReader()

    const [v,setV ] = useState([])
    const onUp = (results) =>{
        console.log("---------------------------")
        
        console.log(results)
        console.log(results.data)
        setV(results.data)
      
        console.log("---------------------------")
    }

  return (
    <><CSVReader config={{header: true ,column: true }}  onUploadAccepted={onUp} 
   >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <div style={styles.csvReader}>
            <button type="button" {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
    {/* <table>
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
      {v.map((item, index) => {
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
          })}
      </tbody>
    </table> */}
    </>


  )
}