
const express=require('express');

const router=express.Router();
const Book=require('../modals/book.model')
const User=require('../modals/user.model');
const ApiFeatures = require("../utils/apifeatures");

router.post("/add", async (req,res)=>{
  try{

const {title,  author , category , status , noOfBooks} = req.body

const book = await Book.create({
title,
author,
category,
status,
noOfBooks
})

res.status(201).send(book);

  }catch(err){
    res.status(404).json({err:"something went wrong"})
}
})


router.get('/', async (req, res) => {

  try {
 
    const apiFeature = new ApiFeatures(Book.find(), req.query)
      .search()
      .filter()
  
    let products = await apiFeature.query;
  
    res.status(200).json({
      products,
    });
    
  } catch (e) {
    return res.status(500).json({ status: 'Failled', message: e.message })
  }
})

router.get('/status/:book', async (req, res) => {

  try{

    const book = await Book.find( { "title" : req.params.book } )
    
    res.status(201).send(book);

  }
  catch (e) {
    return res.status(500).json({ status: 'Failled', message: e.message })
  }
})

router.get('/info/:book', async (req, res) => {

  try{

    const book = await Book.find( { "title" : req.params.book } )

    const {title,  author , category , status , noOfBooks , createdAt} = book
    
    res.status(201).send(createdAt);

  }
  catch (e) {
    return res.status(500).json({ status: 'Failled', message: e.message })
  }
})




module.exports =router;