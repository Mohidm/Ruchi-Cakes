
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require("multer")
const Admin = require('../models/admin')
const prodCategory = require('../models/prod-category')
const Products = require('../models/product')
const path=require("path")
const checkAuth = require("../middleware/check-auth")


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

// Product Category API
router.post('/new-product-category',checkAuth,(req,res)=>{
  const prodCat = new prodCategory({
    code:req.body.code,
    category:req.body.category
})
    
     prodCat.save().then(createdCat=>{  
     res.status(200).json({
     message: 'Category added successfully',
     catId:createdCat._id
})


})
})
router.get("/product-category", (req, res, next) => {
  prodCategory.find().then(documents => {
    res.status(200).json({
      message: "Category fetched successfully!",
      productCategory: documents
    });
  });
});
router.get("/product-category/:id", (req, res, next) => {
  prodCategory.findById(req.params.id).then(category => {
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  });
});
router.put("/product-category/:id", checkAuth,(req, res, next) => {
  const categry = new prodCategory({
    _id: req.body.id,
    code: req.body.code,
    category: req.body.category
  });
  prodCategory.updateOne({ _id: req.params.id }, categry).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
})
router.delete("/product-category/:id",checkAuth,(req,res,next)=>{
  prodCategory.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result)
    res.status(200).json({message:"Category Deleted"})
  })

})
// User Login API
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
         const token= jwt.sign({username:user.username,userId:user._id},'secret-key',
         {expiresIn:'1h'})

         res.status(200).json({
           token:token,
           expiry:3600
         })
          
        }
      }
    }
  })
})
// Product  API
const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
}
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid= MIME_TYPE_MAP[file.mimetype]
    let error = new Error("Invalid File Formate")
    if(isValid){
      error=null
    }
    cb(error,'images')
  },filename:(req,file,cb)=>{
   const name = file.originalname.toLowerCase().split(' ').join('-')
   const ext=MIME_TYPE_MAP[file.mimetype]
   cb(null,name + '-' + Date.now() + '.' +ext)
  }
})
router.post('/new-product',checkAuth,multer({storage:storage}).single("image"),(req,res)=>{
  const url = req.protocol + '://' + req.get("host")
  const product = new Products({
    name:req.body.name,
    category:req.body.category,
    description:req.body.description,
    recipes:req.body.recipes,
    price:req.body.price,
    stock:req.body.stock,
    imagePath:url + "/images/" + req.file.filename,
    quantity:req.body.quantity
})
    
     product.save().then(createdProduct=>{  
     res.status(200).json({
     message: 'Product added successfully',
     product:{
      id:createdProduct._id,
      name:createdProduct.name,
      category:createdProduct.category,
      description:createdProduct.description,
      recipes:createdProduct.recipes,
      price:createdProduct.price,
      stock:createdProduct.stock,
      imagePath:createdProduct.imagePath,
      quantity:createdProduct.quantity
     }
})


})
})

router.get("/products", (req, res, next) => {
  Products.find().then(documents => {
    res.status(200).json({
      message: "Products fetched successfully!",
      product: documents
    });
  });
});

router.get("/products/:id", (req, res, next) => {
  Products.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found!" });
    }
  });
});
router.put("/products/:id",checkAuth,multer({storage:storage}).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath
  if (req.file){
    const url = req.protocol + '://' + req.get("host")
    imagePath = url + "/images/" + req.file.filename
  }
  const product = new Products({
    _id: req.body.id,
    name:req.body.name,
    category:req.body.category,
    description:req.body.description,
    recipes:req.body.recipes,
    price:req.body.price,
    stock:req.body.stock,
    imagePath:imagePath,
    quantity:req.body.quantity
  });
  Products.updateOne({ _id: req.params.id }, product).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
})

router.delete("/products/:id",checkAuth,(req,res,next)=>{
  Products.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result)
    res.status(200).json({message:"Product Deleted"})
  })

})
module.exports = router
