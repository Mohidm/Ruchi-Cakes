
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const products = new Schema({
  name:{type:String, required:true},
  category:{type:String, required:true},
  description:{type:String,},
  recipes:{type:String,},
  price:{type:Number,},
  stock:{type:Number,},
  imagePath:{type:String},
  quantity:{type:String},
  
})
module.exports = mongoose.model('Products2',products)