const mongoose=require("mongoose");
const nodemailer=require("nodemailer")

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("Doc",doc)

        let transporter=nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        //send mail
        let info=await transporter.sendMail({
            from:`CodeHelp`,
            to:doc.email,
            subject:"New file uploaded",
            html:`<h2>hello<h2>
                    View here
                    <a href="${doc.imageUrl}">doc.imageURL</a>`,
        })

        console.log(info);
    }catch(error)
    {
        console.log(error);
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;