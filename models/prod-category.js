
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const prodCategory = new Schema({
  code:String,
  category:String,
  
})
module.exports = mongoose.model('category',prodCategory,'prod-category')