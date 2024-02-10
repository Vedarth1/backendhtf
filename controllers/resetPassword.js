const db = require('../models/userschema');
const bcrypt = require("bcrypt");

exports.resetpassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const user = await db.findOne({ token })

    if (!user) {
        return res.status(500).json({
            success: false,
            message: "didn't find the reset token ",
        });
    }

    let hashedpassword;
    try {
        hashedpassword = await bcrypt.hash(newPassword, 10);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in hashing password",
        });
    }

    user.password = hashedpassword;
    user.token=null;
    try {
        await user.save();
        return res.status(200).json({
            success: true,
            message: "password changed successfully",
        });
    } catch (saveErr) {
        console.error(saveErr);
        return res.status(500).json({
            success: false,
            message: "Error in saving",
        });
    }
}