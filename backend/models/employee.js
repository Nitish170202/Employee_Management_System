const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required:true
    },
    profileImage: {
        type: String,
        required:true,
        unique: true
    },
    date: { type: Date, default: Date.now, required: true },

});

const Employees = mongoose.model('employee', employeeSchema);
module.exports = Employees;