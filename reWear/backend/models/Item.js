const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

    Owner : {type : mongoose.Schema.Types.ObjectId,ref : "User"},
    title : String,
    description : String,
    category : String,
    type : String,//shirt , pants
    size : String, //l , m , xl , xxl
    condition : {type : String,enum :["New",'Like New','Good',"fair"]},
    tags : [String],
    isApproved : {type : Boolean,default : false},
    isAvailable : {type : Boolean,default : true},
    swapRequestedBy : {type : mongoose.Schema.Types.ObjectId,ref : "User",default :null},
    redeemedBy : {type : mongoose.Schema.Types.ObjectId,ref:"User",default : null}

},
{timestamps:true});
module.exports = mongoose.model("Item",itemSchema)
