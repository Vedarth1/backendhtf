const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{
        //extract JWT token
        //other ways to fetch token
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
        console.log(token);
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token missing',
            });
        }

        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            //storing payload in response
            req.user=payload;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
        });
    }
}

exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=="Student")
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for student',
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        });
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="Amin")
        {
            return res.status(401).json({
                success:false,
                message:'This is protected route for admin',
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        });
    }
}