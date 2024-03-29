const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teachers: [{
        type: String
    }],
});

module.exports = mongoose.model('Class', classSchema);
