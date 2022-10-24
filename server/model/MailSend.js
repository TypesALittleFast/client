const mongoose=require('mongoose');

const MailSend = mongoose.Schema({
   fname: {
        type: String,
        required: true,
        
    },
    lname: {
        type: String,
        required: true
    },
    date: {
        type: String,
       default:Date.now()
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});


const MailS = mongoose.model('mailSend', MailSend);

module.exports= MailS;