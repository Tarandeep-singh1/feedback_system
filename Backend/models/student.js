const mongoose =require("mongoose");


const StudentSchema = new mongoose.Schema({
    rollNo: String,
    name: String,
    classId: mongoose.Schema.Types.ObjectId,
    contactNumber: String,
    email: String,
  });

  module.exports=mongoose.model("student",StudentSchema);     

  