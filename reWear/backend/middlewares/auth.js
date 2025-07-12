const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require("../models/User");

// auth
exports.protectedRoute = async(req , res , next) =>{
    try {
        // extract token
        const token  = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
   
         console.log("token is:-",token);
         


        // if Token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Jwt token is missing",
            })
        }

        // verify the token
           try {
             const decode = jwt.verify(token , process.env.JWT_SECRET);
             console.log(decode);
             req.user = decode;
            
           } catch (error) {
               return res.status(401).json({
                success:false,
                message:' token is invalid',
               })
           }

           next();
        
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'something went wrong while validating the token',
        })
    }
}



exports.isAdmin = async (req,res, next) =>{
    
    try {
        const userDetails = await User.findOne({ email: req.user.email });
        console.log( "User details is:-",userDetails);
        console.log("checking is Admin or not ")
        if(userDetails.accountType !== "Admin"){
         return res.status(401).json({
             success:false,
             message:'this is a protect route for Admin only',
         })
        }
      console.log("ckecked and move to next")
        next();
     
    } catch (error) {
        res.status(500).json({
         success:false,
         message:"user role cannot be verified"
        })
    }

 
}
