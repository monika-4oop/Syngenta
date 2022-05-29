
const mongoose = require('mongoose');
const User=require('./user.model.js');

const BookSchema=new mongoose.Schema({
 title:{type:"string",required:"true"},
 author:{type:"string",required:"true"},
 category:{type:"string",required:"true"},
 status:{type:"string",required:"true"},
 noOfBooks:{type:"string",required:"true"},

 createdAt: {
    type: Date,
    default: Date.now,
  },


});


const Book=mongoose.model("book",BookSchema);
module.exports = Book;