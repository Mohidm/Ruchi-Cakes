
const mongoose = require("mongoose")

const ProdCatSchema = mongoose.Schema({
    code:{type:String,required:true},
    category:{type:String,required:true}
});

module.exports=mongoose.model('ProdCategory',ProdCatSchema)