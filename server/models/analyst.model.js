import mongoose from "mongoose";
import moment from 'moment'


const Schema = mongoose.Schema



const analystSchema =  new Schema({
    empId: String,
    TotalTime:Number,
    ActiveTime:Number,
    week:{type:Number,default: () => moment().format("W")},
    createdAt:{type: Date,
        default: () => moment().format("YYYY MM DD")}
},)

const Analyst  = mongoose.model('Analyst',analystSchema)

export default Analyst;