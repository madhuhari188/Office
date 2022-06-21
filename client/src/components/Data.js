import axios from "axios";
import React, { Component } from "react";

export default class Data extends Component{
    constructor(props){
        super(props)
        this.state = {list:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/analyst/')
        .then((res)=>{
            this.setState({list:res.data})
            console.log(res.data)
        })
        console.log(this.state.list)
    }
    render() {
        return (
             <><h1>Hai</h1><div>{this.state.list.map((item,index)=>(
                <ul key={index}>
                    <li>{item.week}</li>
                    <li>{item.TotalTime}</li>
                </ul>
             ))}</div></>
        );
    }
}