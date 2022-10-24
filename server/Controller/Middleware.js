
//  import dotenv from 'dotenv';
const dotenv=require('dotenv');
 dotenv.config({path:"./config/config.env"});
const jwt=require('jsonwebtoken');
const User=require('../model/User');
const Authenticate=async(req,res,next)=>{
try{
const token=req.cookies.jwtoken;
console.log(token);
const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
const rootUser= await User.findOne({_id:verifyToken._id,"tokens.token":token});
if(!rootUser){
    throw new Error('user not found');
}
req.token=token;
req.rootUser=rootUser;
req.userID=rootUser._id;

 next();
}
catch(err){
res.status(401).send('unauthorized:No token Provided');
console.log(err);
}
}


module.exports= Authenticate;