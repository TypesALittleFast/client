const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'../config/config.env'});
const DB="mongodb+srv://abc:Codeword1035@cluster0.dboou.mongodb.net/mathWithKids?retryWrites=true&w=majority"

const connection=()=>{
    mongoose.connect("mongodb+srv://abc:Codeword1035@cluster0.dboou.mongodb.net/mathWithKids?retryWrites=true&w=majority",{
        useUnifiedTopology:true,
        useNewUrlParser: true,
     
    }).then(()=>{
        console.log('successfully connected to database');
    }).catch((e)=>{
    console.log(e);
    });
}
module.exports=connection;