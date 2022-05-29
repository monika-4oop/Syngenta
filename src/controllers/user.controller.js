
const express=require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router=express.Router();
const User=require('../modals/user.model');
const { send } = require('express/lib/response');
router.get('/', async(req,res)=>{
    try{
    const allusers= await User.find().lean().exec();

    res.status(201).send({users:allusers})
    }catch(err) {
        res.status(401).send("something went wrong")
    }
})



router.post("/login", async (req, res) => {
    try {

         const {username, password , email} = req.body
    
     if(!email){
         res.status(422).json({message:"please filled the email"})
         return
    }



    if(!password){
        res.status(422).json({message:"please filled the password"})
        return
   }

   if(!username){
    res.status(422).json({message:"please filled the name"})
    return
   }
   const findemail = await User.findOne({email})
   if(findemail)
   {
    res.status(422).json({message:"email already exists"})
    return
   }

   const findusername = await User.findOne({username})
   if(findusername)
   {
    res.status(422).json({message:"name already exists"})
    return
   }
   const user  = await User.create({
       username,
       email,
       password,
   })
    
  
       res.status(201).send(user);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  
})

// router.get("/filter-by-user", async(req,res)=>{
//     const user= await User.find().sort({user:1})
//     res.send(user)
//   })








module.exports =router;