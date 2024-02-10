const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

function isFiletypeSupported(type,supportedfile){
    return supportedfile.includes(type);
}

async function uploadfileoncloudinary(file,folder)
{   
    const options={folder};
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.fileUpload=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        const supportedTypes=["jpg","jpeg","png","pdf"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        if(!isFiletypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }
        
        const response=await uploadfileoncloudinary(file,"fileupload");
        console.log("responser", response)
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"File uploaded!!"
        })
                                                                                                                                                                                                                               
    }catch(error)
    {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}