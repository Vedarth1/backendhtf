const mongoose=require("mongoose");

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Teacher","Student"]
    },
    token:{
        type:String,
        default: null
    }
});

module.exports=mongoose.model("user",userschema);