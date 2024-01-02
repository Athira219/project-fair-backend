//import dotenv
//Loads .env file contents into process.env by default. 

require('dotenv').config()



//import express

const express = require('express')

//import cors

const cors = require('cors')
//import router
const router = require('./Routing/router')

// //import middileware
// const middileware = require('./middileware/appMiddleware')

//import connection.js

require('./DB/connection')

//create server
//Creates an Express application. The express() function is a top-level function exported by the express module.


const pfServer = express()

// use of cors by server

pfServer.use(cors())

//parsing json 

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
//it convert json into js object

pfServer.use(express.json())

// ///middleware
// pfServer.use(middileware)


//server using the router
pfServer.use(router)

//pfserver used  upload folder
//first arg- how other application use folder
//second arg- to export that particular folder - express.static
pfServer.use('/uploads',express.static('./uploads'))

//cutomize port

const PORT = 4000 || process.env

//run server
pfServer.listen(PORT,()=>{
    console.log(`server running sucessfully at port ${PORT}`);
})

//get request

pfServer.get('/',(req,res)=>{
    res.send(`<h1 style=color:blue>project</h1>`)
})
//post request
pfServer.post('/',(req,res)=>{
    res.send(`project server`)
})
pfServer.put('/',(req,res)=>{
    res.send(`put server`)
})

