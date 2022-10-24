const User=require("../model/User.js")
const crypto=require("crypto");
const nodemailer=require('nodemailer');
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service : 'Gmail',
    
    auth: {
      user: 'hira98607@gmail.com',
      pass: 'ckdyvnghhnawtgxc',
    },
    tls: {
        rejectUnauthorized: false,
      }
    
});
const signupController = async (req, res) => {
    const { mname,surname,surname2, passport,age, email, password,role,select,country,gender} = req.body;
    // const {email, password} = req.body;
    let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push(video.originalname);
    }
  }
    try {
        const user = await User.findOne({ passport });
        if (user) {
            return res.status(400).json({
                errorMessage: 'User already exists',
            });
        }
        const newUser = new User({mname,surname,surname2, passport,age, email, password,role,select,country,gender,videos:videosPaths });

        await newUser.save();
        res.status(201).json({successMsg:" Registered successfully"});

    }
    catch (err) {
        console.log('signupController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
}
const signinController = async (req, res) => {
   
    try {
        let token;
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        if (password !== user.password) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        token= await user.generateAuthToken();
        const { _id, mname, role,passport,surname } = user;
              //Send Token in cookies
            res.cookie("jwtoken",token,{
             
                httpOnly:true
            });
             //Send token as response
            res.json({
                token,
                successMsg:" Registered successfully",
                user: { _id, mname, email, role,passport,surname },
            });
    
    } catch (err) {
        console.log('signinController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

const getAllUsers= async(req,res)=>{
    let posts;
    try{
     posts = await User.find({});
        res.status(200).send(posts);
    }catch( error ){
        res.status(404).send(error)
    }
}

const sendMail=async(req,res)=>{
    try{
        const{fname,lname,email,message}=req.body;
console.log(fname,lname,email,message);
        var mailOptions={
            from:email,
            to: "hira98607@gmail.com",
           subject: "Contact from you Website ",
           html: `<b>My First name is:<b> ${fname}.<br/>
           <b>My Second name is:<b> ${lname}..<br/>
           <b>Message</b>:${message}` // html body
        
         };
        
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return  res.status(500).json({
                    errorMessage: 'Email Send error',
                });
            }
            else{
                console.log('Email Send Successfully');
                res.json({
                    successMessage: 'Email Send Successfully',
                });
            }
         
        });
    }
    catch(err){
        console.log(err);
    }
}

   

const getUser=async(req,res)=>{
    try{
        const _id=req.params.id;
const getPostId=await User.findById({_id});
res.send(getPostId);
    }
    catch(err){
        console.log(err);
    }
};


//update posts
const updateUser=async(req,res)=>{
   
    try{
        const _id=req.params.id;
const getMens=await User.findByIdAndUpdate(_id,req.body,{
    new:true
});
res.send(getMens);
    }
    catch(err){
        console.log(err);
    }
           
}

//delete posts
const deleteUser=async(req,res)=>{
    try{
        
        await User.deleteOne({_id: req.params.id});
        res.status(201).json("User deleted Successfully");
    } catch (error){
        res.status(409).json({ message: "error occured"});     
    }


}



//Downloading files
const download=(req,res)=>{
    const file= req.params.file;
    console.log(file)
   // try{   
        res.download(`../server/public/videos/${file}`)
    //     }catch(err){
    //     response.status(500).json({
    //         errorMessage: 'Server error in file download',})
    // }
}
module.exports={signupController,signinController,deleteUser,updateUser,getUser, getAllUsers,download,sendMail};

    