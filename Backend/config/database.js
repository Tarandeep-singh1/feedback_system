const mongoose = require("mongoose");
require("dotenv").config();

exports.connect=()=>{
   mongoose.connect('mongodb://localhost:27017/signupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log("DB connected successfully"))
    .catch((error)=>{console.log("DB connection failed");
console.error(error);
process.exit(1);})
}
