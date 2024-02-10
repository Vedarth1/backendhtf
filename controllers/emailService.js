const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "muskj12345@gmail.com",
        pass: "pajnwwmlbtvtrrtg",
    },
});

// Function to send the reset email
function sendResetEmail(email, resetToken) {
    // Email content
    const mailOptions = {
        from: "muskj12345@gmail.com",
        to: email,
        subject: "Password Reset",
        html: `<p>You have requested a password reset. Click the following link to reset your password:</p>
               <a href="https://yourdomain.com/reset-password?token=${resetToken}">Reset Password</a> <p>Token:${resetToken}</p>`,
        //replace the link with the reset password pafe, this is dummy link
        //have also shown the token in the mail, for ease of testing on postman.
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


module.exports = {
    sendResetEmail: sendResetEmail
};
