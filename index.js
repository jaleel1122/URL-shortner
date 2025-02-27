const { error } = require("console");
const express = require("express")
const mongoose = require('mongoose')
const shortid = require ('shortid')
const urlSchema = require('./Model/Url') 
const port = process.env.PORT || 3000;
const app = express()

app.use(express.json())

app.post('/shorten', async(req,res)=>{
    const Url = new urlSchema({
        originalUrl : req.body.originalUrl,
        shortId : shortid()
    })
    await Url.save()
    res.send (Url)
})

app.get('/:id', async(req,res)=>{
   const shortid = req.params.id;
   const entery = await urlSchema.findOne({shortId : shortid})
   res.redirect(entery.originalUrl)
   console.log(entery.originalUrl)
   res.end()
})

mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log('database connected'))
.catch(()=> console.log("error"))

app.listen(port, ()=>{
    console.log('server is connected')
})
