const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const Student = mongoose.model('student', studentSchema);

module.exports = Student;

