import express from 'express';
const router = express.Router();

import Dumb from '../models/dumbData.model.js';

router.route('/').get((req,res)=>{
        Dumb.find()
        .then(dumb=>res.json(dumb))
        .catch(err => res.status(400).json('Error:'+err))
});

router.route('/add').post((req,res)=>{
    // const URL = req.body
    // const Total = req.body
    // const Active = req.body
    // const Domain =  req.body
    // const Page = req.body
    // const Title = req.body
    const data = req.body
    // const docs = JSON.stringify(data)
//     var docs = [];
//     for(var i = 0; i < 10000; i++) {
//      docs[i] = req.body;
//  }

    const newData = new Dumb(data)
    

    newData.save()
    .then(()=>res.json('Data Saved'))
    .catch(err=>res.status(400).json('Error:'+err))
})

router.route('/del').delete((req,res)=>{
    Dumb.deleteMany()
    .then(()=>res.json('Exercise Deleted!!!!'))
    .catch(err=>res.status(400).json('Error:'+err))
})


export default router