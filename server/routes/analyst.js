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
    const empId = req.body.empId
    const TotalTime = req.body.TotalTime
    const ActiveTime = req.body.ActiveTime
    // const week = req.body.week
    // const createdAt = req.body.createdAt
    const newData = new Analyst({empId,TotalTime,ActiveTime})

    newData.save()
    .then(()=>res.json('Data Saved!!!'))
    .catch((err)=>res.status(400).json('Error:'+err))
})

router.route('/fetch/src/:min/:max').get((req,res)=>{
    const min = req.params.min
    const max = req.params.max
    const qur = {week:{'$gte':min,'$lte':max} }

    Analyst.find(qur)
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('err'+err))
})

router.route('/fetch/date/').get((req,res)=>{
    // const sDate = req.query.sDate
    // const eDate = req.query.eDate
    // const startDate = new Date(sDate);
    // const endDate = new Date(eDate);

    Analyst.find({createdAt:{$gte:new Date("2022-06-29"),$lte: new Date("2022-07-23")}})
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('err'+err))
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