const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGOOSE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB Connection Successfull"))
    .catch((error)=>{
        console.log("DB Connection Issues")
        console.log(error);
        process.exit(1);
    })
}