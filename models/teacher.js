const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Classes: {
    type: [String], // Array of strings to represent multiple classes
    required: true,
    validate: {
      validator: (classes) => classes.length > 0, // Ensure at least one class is present
      message: 'At least one class must be specified'
    }
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
