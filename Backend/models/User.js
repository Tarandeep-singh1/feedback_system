const mongoose=require("mongoose");
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rollno: String,
  phonenumber: String,
  department: String,
  semester: String,
  otp: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
