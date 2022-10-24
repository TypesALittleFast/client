const  express= require ("express");
const connection=require("./database/db.js");
const router=require("./routes/Routes.js");
const cors=require("cors");
const dotenv=require("dotenv");
const path = require("path");
dotenv.config({path:"./config/config.env"});

const app=express()

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));
app.use(express.json());

app.use(router);
app.use("/public", express.static(path.join(__dirname, "public")));

connection()
app.listen(8000,()=>{
    console.log("server listen on Port 8000");
})