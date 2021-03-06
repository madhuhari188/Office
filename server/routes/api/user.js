import express from 'express';
const router = express.Router();
import bcrypt, { hash } from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import Key from '../../config/keys.js';
import passport from 'passport' ;
 
import loginValidate from '../../validation/login.js';
import registerValidate from '../../validation/register.js';

import User from '../../models/user.model.js'

router.route('/register').post((req,res)=>{

    const {errors,isValid} = registerValidate(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(400).json({email:'Email already exist'});
        }else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                empId: req.body.empId,
                password:req.body.password
            });
            
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if (err) {console.log( err);}
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
                })
            })
        }
    })

})

router.route('/login').post((req,res)=>{

    const {errors,isValid} = loginValidate(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password =  req.body.password;
    console.log(email)
    console.log(password)

    User.findOne({email}).then(user=>{
        if(!user){
            return res.status(404).json({emailnotfound: 'Email Not Found 😣'})
        }

        bcrypt.compare(password,user.password)
        .then(isMatch =>{
            if(isMatch){

                const payload = {
                    id : user.id,
                    name: user.name,
                    empId: user.empId,
                    role: user.role,
                };

                jwt.sign(
                    payload,Key.key,{
                        expiresIn: 900
                    },
                    (err,token)=>{
                        res.json({
                            success: true,
                            token: 'Bearer' + token
                        })
                    }
                )
            }else{
                return res.status(400).json({passwordinCorrect:'Password Incorrect 😲'})
            }
        })
    })


})



router.route('/users').get((req,res)=>{
    User.find({},'name')
    .then(user=>res.json(user))
    .catch((err)=>res.status(400).json('Error:'+err))
})
router.route('/allusers').get((req,res)=>{
    User.find()
    .then(user=>res.json(user))
    .catch((err)=>res.status(400).json('Error:'+err))
})

router.route('/:id').get((req,res)=>{
    User.findById(req.params.id)
    .then(user=>res.json(user))
    .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/update/:id').post((req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        user.name = req.body.name;
        user.email = req.body.email;
        user.empId = req.body.empId;

        user.save()
        .then(()=>res.json('User Updated Updated!!!'))
        .catch(err=>res.status(400).json('Error'+err))
    })
    .catch(err=>res.status(400).json('Error'+err))
})

export default router
