
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('../models/admin')
const ProdCategory = require('../models/prod-category')
const db = 'mongodb+srv://mohid:mongoose@cluster0.ughwg.mongodb.net/ruchi-cakes?retryWrites=true&w=majority'
mongoose.connect(db,err=>{
  if(err){
    console.log("Error" + err)
  }else{
    console.log('Connected to MongoDB')
  }
})

router.get('/',(req,res) => {
      res.send('From API Route')
})
router.post('/new-product-category',(req,res)=>{
  let prodCat = req.body
  let category = new ProdCategory(prodCat)
  category.save((error,newCategory)=>{
    if(error){
      console.log(error)
    }else{
     
      res.status(200).send(newCategory)
    }
  })
})
router.post('/login',(req,res)=>{
  let userData = req.body
  Admin.findOne({username:userData.username},(error,user)=>{
    if(error){
      console.log(error)
    }else{
      if(!user){
        res.status(401).send('Invalid username')
        
      }else{
        if(user.password !==userData.password){
          res.status(401).send('Invalid password')
        }else{
         
          res.status(200).send(user)
        }
      }
    }
  })
})

module.exports = router
