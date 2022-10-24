const  express= require ("express");
const cookieParser=require('cookie-parser');
const { signupController, signinController,getAllUsers,getUser,updateUser,deleteUser,download, sendMail } = require("../Controller/auth");
const Authenticate=require('../Controller/Middleware');
const upload=require('../utils/uploads');
const router=express.Router();
router.use(cookieParser());
router.post('/signup',upload.fields([ { name: "videos",maxCount: 5,},]),signupController);
router.post('/signin',signinController);
router.post('/createUser',signupController);
router.get('/getAllUsers',getAllUsers);
router.get('/getUser/:id',getUser);
router.patch('/updateUser/:id',updateUser);
router.delete('/deleteUser/:id',deleteUser);
router.get("/getFiles/:file",download);
router.post("/mailSend",sendMail);
//About Us Page
router.get('/about',Authenticate, (req,res)=>{
    res.send(req.rootUser);
    console.log(req.rootUser);

});
module.exports=router;
