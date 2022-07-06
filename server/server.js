import express,{json} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import bodyParser from 'body-parser'
import passport2 from './config/passport.cjs'

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
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(passport.initialize())
// passport2(passport)


import dumbRouter from './routes/dumb.js'
import Analyst from './routes/analyst.js'
import User from './routes/api/user.js'

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', yourExactHostname);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

app.use('/dumb',dumbRouter);
app.use('/analyst',Analyst);
app.use('/api/user',User)

app.listen(port,()=>{
    console.log(`Server Running On Port : ${port}`);
});