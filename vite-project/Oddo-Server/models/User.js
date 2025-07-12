import mongoose, { mongo } from "mongoose";
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
const User = mongoose.model("User",userSchema);
export default User;
