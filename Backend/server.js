// /server.js
const express = require('express');
const mongoose = require('mongoose');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes=require('./routes/LoginRoutes');
const formRoutes=require('./routes/submitform');
const bodyParser = require('body-parser');
 const cors = require('cors');
const getuserdata=require('./routes/getuserdata');
const submitfeedback=require('./routes/submitfeedback');
const addsubject=require('./routes/subject_teacher_add/subject_route');
const addteacher=require('./routes/subject_teacher_add/teacher_route');
const teachergive=require('./routes/teachergive');
const feedbackgive=require('./routes/feedbackgiver');
const userinfo=require('./routes/userinfo');
const updateuser=require('./routes/updateuser');

const app = express();
 app.use(cors()); 
// Middleware

app.use(express.json()); // This parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/signupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>console.log("DB connected successfully"))
      .catch((error)=>{console.log("DB connection failed");
  console.error(error);
  process.exit(1);})
// Use Routes
app.use('/api', signupRoutes);
app.use('/api', loginRoutes);
app.use('/api', getuserdata);
app.use('/api',formRoutes);
app.use('/api', submitfeedback);
app.use('/api', addsubject);
app.use('/api', addteacher);
app.use('/api',teachergive);
app.use('/api',feedbackgive);
app.use('/api',userinfo);
app.use('/api',updateuser);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
