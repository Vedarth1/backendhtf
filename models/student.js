const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Id: {
        type: String,
        required: true,
        unique: true
    },
    Class: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
