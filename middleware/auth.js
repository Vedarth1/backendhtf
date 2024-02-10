const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        //extract JWT token
        //other ways to fetch token
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token missing',
            });
        }
        else{
            console.log("Token Present")
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Given Payload "+payload);
            //storing payload in response
            req.user = payload;
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong, while verifying the token',
        });
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is protected route for student',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching',
        });
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Amin") {
            return res.status(401).json({
                success: false,
                message: 'This is protected route for admin',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching',
        });
    }
}