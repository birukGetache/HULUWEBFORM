const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,   
    department: String,
    email: String,
    yearsOfExperience: {
        type: Number,
        default: '0'  // Set default value to '9'
    },
    phoneNumber: String,
    location: String,
    gender: String,
    urgency: String,
    hiredBy:String,
    hired: String,
    createdAt: String,
    experiance: String,
    hireDate:String
});

const FormData = mongoose.model('FormData', formSchema);

module.exports = FormData;
