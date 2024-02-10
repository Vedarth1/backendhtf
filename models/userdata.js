const mongoose = require('mongoose');

const classdetailschema = new mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    link:{
        type:String,
        required:true
    }
    //remailing entities
});

const Userclass = mongoose.model('classdetailschema', classdetailschema);

const classSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'classdetailschema' 
    }],
});

const Class = mongoose.model('Class', classSchema);


const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    classes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class' 
    }],
    // other student-related properties
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student, Class, File };
