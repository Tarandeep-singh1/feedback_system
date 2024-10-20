const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/getuserdata', async (req, res) => {
    const { email } = req.body;
    const user=await User.findOne({email});
    if(user){
         return res.status(200).json({
        name:user.name,
    semester:user.semester,})
    }else{
return res.status(401).json({
    success:false,
})
    }
})

  

module.exports=router;