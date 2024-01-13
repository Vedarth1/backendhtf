const File=require("../models/File");
const cloudinary=require("cloudinary").v2;

exports.localFileUpload=async (req,res)=>{
    try{
        const file=req.files.file;
        console.log("File agayi:",file);

        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:'Local File Upload Successfully',
        })
    }catch(error)
    {
        console.log("file upload nhi hui");
        console.log(error);
    }
}

function isFiletypeSupported(type,supportedfile){
    return supportedfile.includes(type);
}

async function uploadfileoncloudinary(file,folder)
{   
    const options={folder};
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

async function uploadfileoncloudinary(file,folder,quality)
{   
    const options={folder};
    if(quality)
    {
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
exports.imageUpload=async (req,res)=>{
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

exports.videoUpload=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;

        const supportedTypes=["mp4","mov","mp3"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        if(!isFiletypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:'Video format not supported',
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
            message:"Video uploaded!!"
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

exports.imageReducerUpload=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;

        const supportedTypes=["mp4","mov","mp3","jpg"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(fileType)

        if(!isFiletypeSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:'Video format not supported',
            })
        }

        const response=await uploadfileoncloudinary(file,"fileupload",30);
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
            message:"image uploaded!!"
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