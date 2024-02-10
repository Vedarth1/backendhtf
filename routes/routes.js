const express=require("express");
const router=express.Router();

const {fileUpload}=require("../Controllers/fileUpload");
const {login,signup} = require("../Controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middleware/auth");
const {forgotpassword}=require("../Controllers/forgotpassword");
const {resetpassword}=require("../Controllers/resetPassword");

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