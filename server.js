const express=require("express");
const app=express()

//json
const bodyParser =require("express").json
app.use(bodyParser());

//routes
const userRouters= require('./Route/UserRoute')
app.use('/api/users',userRouters)


//dotenv
const dotenv = require ("dotenv")
dotenv.config()


//db connect
const database=require("./config/database");
//const router = require("./UserRoute");
database()


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



app.listen (process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});