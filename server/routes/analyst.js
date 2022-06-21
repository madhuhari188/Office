import express from 'express'
const router = express.Router()

import Analyst from '../models/analyst.model.js'

router.route('/').get((req,res)=>{
    Analyst.find()
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('Error:'+err))
})

router.route('/add').post((req,res)=>{
    // const data = req.body
    const TotalTime = req.body.TotalTime
    const ActiveTime = req.body.ActiveTime
    const week = req.body.week
    const newData = new Analyst({TotalTime,ActiveTime,week})

    newData.save()
    .then(()=>res.json('Data Saved!!!'))
    .catch((err)=>res.status(400).json('Error:'+err))
})

router.route('/fetch').get((req,res)=>{
    Analyst.find(req.query)
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('Error:'+err))
})
router.route('/del').delete((req,res)=>{
    Analyst.deleteMany()
    .then(()=>res.json('Exercise Deleted!!!!'))
    .catch(err=>res.status(400).json('Error:'+err))
})


export default router;