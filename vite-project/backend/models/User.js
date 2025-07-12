<<<<<<< HEAD:vite-project/backend/models/User.js
const mongoose = require("mongoose");
=======
import mongoose, from "mongoose";
>>>>>>> 42f22e1e99df78a6eb75fa3bd7412120cae00ae2:vite-project/Oddo-Server/models/User.js
const userSchema = new mongoose.Schema({
    firstName : {type : String, required : true,trim : true},
    lastName : {type : String,required : true,trim : true,},
    email : {
        type  :String,
        required : true, unique : true, 
    },
    password : {type : String, required : true,},
    profileImage : {type : String, default : null},
    location : {
        city : String,
        state : String,
    },
    points : {
        type : Number , default : 100
    },
    role : {type : String, enum : ['user' ,'admin'],default : 'user'},

},
{timestamps : true});
module.exports  = mongoose.model('User',userSchema)
