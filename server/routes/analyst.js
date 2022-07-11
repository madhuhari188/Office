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

router.route('/fetch/time/').get((req,res)=>{
    const id = req.query.empId;
    const date = req.query.date;
    // http://localhost:5000/analyst/fetch/time?empId=025&date=2022-07-08

    Analyst.find({$or:[{empId:id},{createdAt:{$gte:new Date(date)}}]})
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('err'+err))
})
router.route('/fetch/id').get((req,res)=>{
    const empId = req.query.empId;
    Analyst.find({empId:empId})
    .then(analyst=>res.json(analyst)) 
    .catch(err=>res.status(400).json('err'+err))
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
    const sDate = req.query.sDate
    const eDate = req.query.eDate
    const startDate = new Date(sDate);
    const endDate = new Date(eDate);

    Analyst.find({createdAt:{$gte:startDate,$lte: endDate}})
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('err'+err))
})

router.route('/fetch/report/').get((req,res)=>{
    const sDate = req.query.sDate
    const eDate = req.query.eDate
    const empId = req.query.empId

    Analyst.find({empId:empId,createdAt:{$gte:new Date(sDate),$lte: new Date(eDate)}})
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('err'+err))
    // if(empId === ''){
    //     Analyst.find({createdAt:{$gte:new Date(sDate),$lte: new Date(eDate)}})
    // .then(analyst=>res.json(analyst))
    // .catch(err=>res.status(400).json('err'+err))
    // }else{
    //     Analyst.find({empId:empId,createdAt:{$gte:new Date(sDate),$lte: new Date(eDate)}})
    // .then(analyst=>res.json(analyst))
    // .catch(err=>res.status(400).json('err'+err))
    // }
    // Analyst.find({empId:'020',createdAt:{$gte:new Date('2022-06-23'),$lte: new Date('2022-07-08')}})
    // .then(analyst=>res.json(analyst))
    // .catch(err=>res.status(400).json('err'+err))
})

router.route('/fetch').get((req,res)=>{
    const date = req.query.createdAt
    Analyst.find({createdAt:{$gte:new Date(date)}})
    .then(analyst=>res.json(analyst))
    .catch(err=>res.status(400).json('Error:'+err))
})
router.route('/del').delete((req,res)=>{
    Analyst.deleteMany()
    .then(()=>res.json('Exercise Deleted!!!!'))
    .catch(err=>res.status(400).json('Error:'+err))
})


export default router;