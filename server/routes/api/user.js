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
                    empId: user.empId
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

export default router
