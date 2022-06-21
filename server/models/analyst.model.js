import mongoose from "mongoose";



const Schema = mongoose.Schema

const analystSchema =  new Schema({
    TotalTime:Number,
    ActiveTime:Number,
    week:Number,
},)

const Analyst  = mongoose.model('Analyst',analystSchema)

export default Analyst;