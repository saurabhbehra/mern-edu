const express =require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const session=require('express-session');
const cookieParser = require('cookie-parser');


const ProductRoutes = require("./api/router/product");
const CartRoutes = require("./api/router/cart");
const UserRoutes = require("./api/router/user");

//dot env
dotenv.config();

//image middleware
app.use('/uploads',express.static('uploads'));

// initialize the database connection
const mon = require('./config/database');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
  secret:'mysecret', 
  resave:true,
  saveUninitialized:true,
 }));
app.use(cookieParser('mysecret'));


//CORES header for handling error 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  
    res.setHeader('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
    next(); 
});

//Routes which should handle requests
app.use('/product',ProductRoutes);
app.use('/cart',CartRoutes);
app.use('/user',UserRoutes);


 //error handling
app.use((req,res,next)=>{
    const error=new Error('Not found'); 
    error.status=404;
    next(error);
})

//error handling
app.use((error,req,res,next)=>{         
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;