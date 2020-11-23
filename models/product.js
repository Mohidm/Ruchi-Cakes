
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const prodCategory = new Schema({
  name:String,
  category:String,
  description:String,
  recipes:String,
  price:Number,
  stock:Number,
  quantity:String
  
})
module.exports = mongoose.model('category',prodCategory,'prod-category')