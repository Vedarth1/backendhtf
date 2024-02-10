const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Teacher'],
        default: 'Teacher',
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }],
    token: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
