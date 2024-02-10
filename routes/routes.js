const express=require("express");
const router=express.Router();

const {auth,isStudent,isAdmin}=require("../middleware/auth");
const {login,signup} = require("../Controllers/auth.js");
const {forgotpassword}=require("../Controllers/forgotpassword");
const {resetpassword}=require("../Controllers/resetPassword");
const {fileUpload}=require("../Controllers/fileUpload");

router.post("/login",login);
router.post("/signup",signup);
router.post("/forgotpassword",forgotpassword)
router.post("/resetpassword",resetpassword);
router.post("/fileUpload",fileUpload);

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for student",
    });
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for Admin",
    });
});

module.exports=router;