import express,{json} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

const URI = process.env.ATLAS_URI;

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>{
    if(err) throw err;
    console.log('Connected to MongoDB Atlas!!!!')
})

app.use(cors());
app.use(json());


import dumbRouter from './routes/dumb.js'
import Analyst from './routes/analyst.js'

app.use('/dumb',dumbRouter);
app.use('/analyst',Analyst);


app.listen(port,()=>{
    console.log(`Server Running On Port : ${port}`);
});