
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000
const app = express()
app.use(cors())
const api = require('./routes/api')
app.use(bodyParser.json())
app.use('/api',api)
const path=require("path")

app.use('/images',express.static(path.join('images')))

app.get('/',function(req,res){
  res.send('Hello From Sever  ')
})
app.listen(port,function(){
  console.log('server running on localhost:'+port)
})
