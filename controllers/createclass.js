const Class = require('../models/classschema');
const User = require("../models/userschema")

exports.createclass = async (req, res) => {
    try {
        const { user } = req; // Assuming you have authenticated the user and set 'user' object in req

        if (user) {
            const { className, classCode } = req.body;

            // Check for required fields
            if (!className || !classCode) {
                return res.status(400).json({ error: 'Missing required fields: className, classCode' });
            }

            // Check if user role is "Teacher"
            if (user.role !== 'Teacher') {
                return res.status(403).json({ error: 'Access denied. Only teachers can create classes' });
            }

            // Create a new class with the logged-in teacher's ID
            const newClass = new Class({
                name: className,
                code: classCode,
                // Add the current user's ID as a teacher
            });
            console.log(user.id)
            newClass.teachers.push(user.id);

            // Save the class to the database and handle potential errors
            const savedClass = await newClass.save();
            console.log(savedClass);

            const x = await User.findById(user.id);
            x.classes.push(savedClass._id);
            x.save();
            console.log(x);

            res.status(201).json({ message: 'Class created successfully' });
        } else {
            return res.status(403).json({ error: 'Access denied. You need to be logged in as a teacher' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
