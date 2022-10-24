
const mongoose =require(  "mongoose");
// import validator from "validator";
// import jwt from 'jsonwebtoken';
const jwt=require("jsonwebtoken")
const UserSchema = new mongoose.Schema(
    {
        mname: {
            type: String,
            // required: true,
        },
        surname: {
            type: String,
            // required: true,
        },
        surname2: {
            type: String,
            // required: true,
        },
        passport:{
            type:String,
            
        },
        email: {
            type: String,
            // required: true,
        },
        age:{
             type:String,
            //  required:true,
        },
     
        password: {
            type: String,
            // required: true,
        },
        select: {
            type: String,
            // required: true,
        },
        gender: {
            type: String,
            // required: true,
        },
        country:{
            type:String,
        },
       videos: [{ type: String }],
        role: {
            type: String,
            default: 'user',
        },
        emailToken:{
            type:String
        },
      
     
        tokens:[
            { 
                token:{
                    type:String,
                    // required:true 
                }
                 
            }
        ]
    },
);



// generating the token
UserSchema.methods.generateAuthToken=async function(){
    try{
        //generate the token
     let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
     //now add into your document
     this.tokens=this.tokens.concat({token:token});
     //save it into database collection
     await this.save();
     return token;
    }
    catch(err){
console.log(err);
    }
}

const User = mongoose.model('User', UserSchema);

module.exports= User;
