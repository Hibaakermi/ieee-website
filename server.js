const express=require("express");
const http = require('http');
const app=express()
const flash = require("express-flash")


app.use(flash());



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

const hashedPassword = require('./Middleware/Authenticate.js');
const passport = require("passport");
app.use(hashedPassword);


app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); 
    next();
});   


app.listen (process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});