const crypto = require('crypto');
const emailService = require('./emailService');
const db = require('../models/userschema');

exports.forgotpassword = async (req, res) => {
    const email = req.body.email;
    const resetToken = crypto.randomBytes(32).toString('hex');
    try {
        const user = await db.findOne({ email });

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "user not exists",
            });
        }

        user.token = resetToken;
        try {
            await user.save();
            emailService.sendResetEmail(email, resetToken);
            return res.status(200).json({
                success: true,
                message: "Reset token inserted successfully",
            });
        } catch (saveErr) {
            console.error(saveErr);
            return res.status(500).json({
                success: false,
                message: "Error in saving",
            });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "password cannot be reset ",
        });
    }
}