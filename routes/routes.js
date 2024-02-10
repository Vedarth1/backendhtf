const express = require("express");
const router = express.Router();

const { auth, isStudent, isAdmin } = require("../middleware/auth");
const { login, signup } = require("../controllers/auth");
const { forgotpassword } = require("../controllers/forgotpassword");
const { resetpassword } = require("../controllers/resetPassword");
const { fileUpload } = require("../controllers/fileUpload");
const { classes } = require("../controllers/fetchclasses");
const { createclass } = require("../controllers/createclass");

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotpassword", forgotpassword)
router.post("/resetpassword", resetpassword);
router.post("/fileUpload", fileUpload);
router.get("/classes", auth, classes)
router.post("/createclass", auth, createclass);

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for student",
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for Admin",
    });
});

module.exports = router;