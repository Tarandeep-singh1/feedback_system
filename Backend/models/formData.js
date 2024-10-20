const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    subject: {
        type: String,
       
    },
    teacher: {
        type: String,
      
    },
    
    email: {
        type: String,
        required: true,
        unique: false,
    },
   
    knowledge: {
        type: Number,
        min: 1, 
        max: 5 
    },
    communication: {
        type: Number,
        min: 1,
        max: 5
    },
    sincerity: {
        type: Number,
        min: 1,
        max: 5
    },
    interest: {
        type: Number,
        min: 1,
        max: 5
    },
    integration: {
        type: Number,
        min: 1,
        max: 5
    },
    accessibility: {
        type: Number,
        min: 1,
        max: 5
    },
    initiative: {
        type: Number,
        min: 1,
        max: 5
    },
    fairness: {
        type: Number,
        min: 1,
        max: 5
    },
    regularity: {
        type: Number,
        min: 1,
        max: 5
    },
    completion: {
        type: Number,
        min: 1,
        max: 5
    },
    overallRating:{
        type: Number,
        min: 1,
        max: 5
    },
    comments: String 
});


module.exports = mongoose.model("Form", FormSchema);